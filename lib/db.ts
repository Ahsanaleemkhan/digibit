/**
 * Database layer using better-sqlite3
 * Single source of truth for all CMS content
 */
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'digibit.db');
const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize database connection
export const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// Initialize database schema
export function initializeDatabase() {
  // CMS Content table - stores all page content as JSON
  db.exec(`
    CREATE TABLE IF NOT EXISTS cms_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_key TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_by TEXT
    );
    
    CREATE INDEX IF NOT EXISTS idx_page_key ON cms_content(page_key);
  `);

  // Submissions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      name TEXT,
      email TEXT,
      phone TEXT,
      company TEXT,
      message TEXT,
      services TEXT,
      budget TEXT,
      timeline TEXT,
      data TEXT,
      status TEXT DEFAULT 'new',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_submission_type ON submissions(type);
    CREATE INDEX IF NOT EXISTS idx_submission_status ON submissions(status);
    CREATE INDEX IF NOT EXISTS idx_submission_created ON submissions(created_at);
  `);

  // Admins table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_login DATETIME
    );
    
    CREATE INDEX IF NOT EXISTS idx_admin_email ON admins(email);
  `);

  // Theme settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS theme_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Media library table
  db.exec(`
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      path TEXT NOT NULL,
      alt_text TEXT,
      caption TEXT,
      uploaded_by TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_media_created ON media(created_at);
  `);

  // Services table
  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      short_title TEXT,
      icon TEXT,
      category TEXT,
      excerpt TEXT,
      featured_image TEXT,
      
      -- Hero section
      eyebrow TEXT,
      h1_text TEXT,
      lede TEXT,
      cta_label TEXT,
      visual_word TEXT,
      
      -- Deliverables section
      deliverables_title TEXT,
      deliverables TEXT,
      
      -- Process section
      process_title TEXT,
      process_steps TEXT,
      
      -- Case study section
      case_title TEXT,
      case_desc TEXT,
      case_stats TEXT,
      case_link TEXT,
      
      -- FAQ section
      faqs TEXT,
      
      -- Bottom CTA
      cta_bottom TEXT,
      cta_bottom_btn TEXT,
      
      -- Display options
      featured BOOLEAN DEFAULT 0,
      homepage_order INTEGER DEFAULT 0,
      published INTEGER DEFAULT 0,
      
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_service_slug ON services(slug);
    CREATE INDEX IF NOT EXISTS idx_service_published ON services(published);
    CREATE INDEX IF NOT EXISTS idx_service_homepage_order ON services(homepage_order);
  `);

  // Work items table
  db.exec(`
    CREATE TABLE IF NOT EXISTS work_items (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      category TEXT,
      excerpt TEXT,
      featured_image TEXT,
      client TEXT,
      year TEXT,
      services TEXT,
      challenge TEXT,
      solution TEXT,
      results TEXT,
      gallery_images TEXT,
      testimonial_quote TEXT,
      testimonial_author TEXT,
      testimonial_role TEXT,
      published INTEGER DEFAULT 0,
      
      -- Additional fields for rich case study content
      timeline TEXT,
      h1_text TEXT,
      lede TEXT,
      visual_bg TEXT,
      visual_word TEXT,
      visual_image TEXT,
      frame1_label TEXT,
      frame1_word TEXT,
      frame1_bg TEXT,
      frame1_image TEXT,
      frame2_label TEXT,
      frame2_word TEXT,
      frame2_bg TEXT,
      frame2_image TEXT,
      brief_heading TEXT,
      brief_paras TEXT,
      what_heading TEXT,
      what_paras TEXT,
      outcome_heading TEXT,
      outcome_paras TEXT,
      
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_work_slug ON work_items(slug);
    CREATE INDEX IF NOT EXISTS idx_work_published ON work_items(published);
  `);

  // Blog posts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      excerpt TEXT,
      featured_image TEXT,
      gradient_bg TEXT,
      category TEXT,
      tag TEXT,
      author_name TEXT,
      author_role TEXT,
      read_time TEXT,
      published_date TEXT,
      
      -- Content
      content TEXT,
      sections TEXT,
      
      -- SEO
      meta_description TEXT,
      
      -- Display
      featured INTEGER DEFAULT 0,
      published INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
    CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(published);
    CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
    CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(featured);
  `);
}

// CMS Content operations
export const cmsContent = {
  getByKey(pageKey: string) {
    const stmt = db.prepare('SELECT * FROM cms_content WHERE page_key = ?');
    const row = stmt.get(pageKey) as any;
    return row ? { ...row, content: JSON.parse(row.content) } : null;
  },

  getAll() {
    const stmt = db.prepare('SELECT * FROM cms_content ORDER BY page_key');
    const rows = stmt.all() as any[];
    return rows.map(row => ({ ...row, content: JSON.parse(row.content) }));
  },

  upsert(pageKey: string, content: any, updatedBy?: string) {
    const stmt = db.prepare(`
      INSERT INTO cms_content (page_key, content, updated_by, updated_at)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(page_key) DO UPDATE SET
        content = excluded.content,
        updated_by = excluded.updated_by,
        updated_at = CURRENT_TIMESTAMP
    `);
    return stmt.run(pageKey, JSON.stringify(content), updatedBy || null);
  },

  delete(pageKey: string) {
    const stmt = db.prepare('DELETE FROM cms_content WHERE page_key = ?');
    return stmt.run(pageKey);
  }
};

// Submissions operations
export const submissions = {
  getAll(type?: string, status?: string) {
    let query = 'SELECT * FROM submissions WHERE 1=1';
    const params: any[] = [];
    
    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    const stmt = db.prepare(query);
    return stmt.all(...params);
  },

  getById(id: number) {
    const stmt = db.prepare('SELECT * FROM submissions WHERE id = ?');
    return stmt.get(id);
  },

  create(data: any) {
    const stmt = db.prepare(`
      INSERT INTO submissions (
        type, name, email, phone, company, message, 
        services, budget, timeline, data, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.type || 'contact',
      data.name || null,
      data.email || null,
      data.phone || null,
      data.company || null,
      data.message || null,
      data.services ? JSON.stringify(data.services) : null,
      data.budget || null,
      data.timeline || null,
      data.data ? JSON.stringify(data.data) : null,
      data.status || 'new'
    );
  },

  updateStatus(id: number, status: string) {
    const stmt = db.prepare(`
      UPDATE submissions 
      SET status = ?, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `);
    return stmt.run(status, id);
  },

  delete(id: number) {
    const stmt = db.prepare('DELETE FROM submissions WHERE id = ?');
    return stmt.run(id);
  }
};

// Admin operations
export const admins = {
  getAll() {
    const stmt = db.prepare('SELECT id, email, name, role, created_at, last_login FROM admins');
    return stmt.all();
  },

  getByEmail(email: string) {
    const stmt = db.prepare('SELECT * FROM admins WHERE email = ?');
    return stmt.get(email);
  },

  create(email: string, password: string, name: string, role = 'admin') {
    const stmt = db.prepare(`
      INSERT INTO admins (email, password, name, role)
      VALUES (?, ?, ?, ?)
    `);
    return stmt.run(email, password, name, role);
  },

  updateLastLogin(email: string) {
    const stmt = db.prepare(`
      UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE email = ?
    `);
    return stmt.run(email);
  },

  delete(id: number) {
    const stmt = db.prepare('DELETE FROM admins WHERE id = ?');
    return stmt.run(id);
  }
};

// Theme settings operations
export const themeSettings = {
  get(key: string) {
    const stmt = db.prepare('SELECT value FROM theme_settings WHERE key = ?');
    const row = stmt.get(key) as any;
    return row ? JSON.parse(row.value) : null;
  },

  getAll() {
    const stmt = db.prepare('SELECT * FROM theme_settings');
    const rows = stmt.all() as any[];
    return rows.reduce((acc, row) => {
      acc[row.key] = JSON.parse(row.value);
      return acc;
    }, {} as Record<string, any>);
  },

  set(key: string, value: any) {
    const stmt = db.prepare(`
      INSERT INTO theme_settings (key, value, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updated_at = CURRENT_TIMESTAMP
    `);
    return stmt.run(key, JSON.stringify(value));
  }
};

// Media operations
export const media = {
  getAll() {
    const stmt = db.prepare('SELECT * FROM media ORDER BY created_at DESC');
    return stmt.all();
  },

  getById(id: number) {
    const stmt = db.prepare('SELECT * FROM media WHERE id = ?');
    return stmt.get(id);
  },

  create(data: {
    filename: string;
    original_name: string;
    mime_type: string;
    size: number;
    path: string;
    alt_text?: string;
    caption?: string;
    uploaded_by?: string;
  }) {
    const stmt = db.prepare(`
      INSERT INTO media (
        filename, original_name, mime_type, size, path,
        alt_text, caption, uploaded_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.filename,
      data.original_name,
      data.mime_type,
      data.size,
      data.path,
      data.alt_text || null,
      data.caption || null,
      data.uploaded_by || null
    );
  },

  update(id: number, data: { alt_text?: string; caption?: string }) {
    const stmt = db.prepare(`
      UPDATE media 
      SET alt_text = ?, caption = ?
      WHERE id = ?
    `);
    return stmt.run(data.alt_text || null, data.caption || null, id);
  },

  delete(id: number) {
    const stmt = db.prepare('DELETE FROM media WHERE id = ?');
    return stmt.run(id);
  }
};

// Work items operations
export const workItems = {
  getAll(publishedOnly = false) {
    let query = 'SELECT * FROM work_items';
    if (publishedOnly) {
      query += ' WHERE published = 1';
    }
    query += ' ORDER BY year DESC, created_at DESC';
    const stmt = db.prepare(query);
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      services: row.services ? JSON.parse(row.services) : [],
      results: row.results ? JSON.parse(row.results) : [],
      gallery_images: row.gallery_images ? JSON.parse(row.gallery_images) : [],
      published: Boolean(row.published)
    }));
  },

  getBySlug(slug: string) {
    const stmt = db.prepare('SELECT * FROM work_items WHERE slug = ?');
    const row = stmt.get(slug) as any;
    if (!row) return null;
    return {
      ...row,
      services: row.services ? JSON.parse(row.services) : [],
      results: row.results ? JSON.parse(row.results) : [],
      gallery_images: row.gallery_images ? JSON.parse(row.gallery_images) : [],
      published: Boolean(row.published)
    };
  },

  getById(id: string) {
    const stmt = db.prepare('SELECT * FROM work_items WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      services: row.services ? JSON.parse(row.services) : [],
      results: row.results ? JSON.parse(row.results) : [],
      gallery_images: row.gallery_images ? JSON.parse(row.gallery_images) : [],
      published: Boolean(row.published)
    };
  },

  create(data: any) {
    const stmt = db.prepare(`
      INSERT INTO work_items (
        id, slug, title, category, excerpt, featured_image,
        client, year, services, challenge, solution, results,
        gallery_images, testimonial_quote, testimonial_author,
        testimonial_role, published,
        timeline, h1_text, lede, visual_bg, visual_word, visual_image,
        frame1_label, frame1_word, frame1_bg, frame1_image,
        frame2_label, frame2_word, frame2_bg, frame2_image,
        brief_heading, brief_paras, what_heading, what_paras,
        outcome_heading, outcome_paras
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.id,
      data.slug,
      data.title,
      data.category || null,
      data.excerpt || null,
      data.featured_image || null,
      data.client || null,
      data.year || null,
      JSON.stringify(data.services || []),
      data.challenge || null,
      data.solution || null,
      JSON.stringify(data.results || []),
      JSON.stringify(data.gallery_images || []),
      data.testimonial_quote || null,
      data.testimonial_author || null,
      data.testimonial_role || null,
      data.published ? 1 : 0,
      // New fields
      data.timeline || null,
      data.h1_text || null,
      data.lede || null,
      data.visual_bg || null,
      data.visual_word || null,
      data.visual_image || null,
      data.frame1_label || null,
      data.frame1_word || null,
      data.frame1_bg || null,
      data.frame1_image || null,
      data.frame2_label || null,
      data.frame2_word || null,
      data.frame2_bg || null,
      data.frame2_image || null,
      data.brief_heading || null,
      data.brief_paras || null,
      data.what_heading || null,
      data.what_paras || null,
      data.outcome_heading || null,
      data.outcome_paras || null
    );
  },

  update(id: string, data: any) {
    const stmt = db.prepare(`
      UPDATE work_items SET
        slug = ?, title = ?, category = ?, excerpt = ?,
        featured_image = ?, client = ?, year = ?, services = ?,
        challenge = ?, solution = ?, results = ?, gallery_images = ?,
        testimonial_quote = ?, testimonial_author = ?, testimonial_role = ?,
        published = ?,
        timeline = ?, h1_text = ?, lede = ?, visual_bg = ?, visual_word = ?, visual_image = ?,
        frame1_label = ?, frame1_word = ?, frame1_bg = ?, frame1_image = ?,
        frame2_label = ?, frame2_word = ?, frame2_bg = ?, frame2_image = ?,
        brief_heading = ?, brief_paras = ?, what_heading = ?, what_paras = ?,
        outcome_heading = ?, outcome_paras = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(
      data.slug,
      data.title,
      data.category || null,
      data.excerpt || null,
      data.featured_image || null,
      data.client || null,
      data.year || null,
      JSON.stringify(data.services || []),
      data.challenge || null,
      data.solution || null,
      JSON.stringify(data.results || []),
      JSON.stringify(data.gallery_images || []),
      data.testimonial_quote || null,
      data.testimonial_author || null,
      data.testimonial_role || null,
      data.published ? 1 : 0,
      // New fields
      data.timeline || null,
      data.h1_text || null,
      data.lede || null,
      data.visual_bg || null,
      data.visual_word || null,
      data.visual_image || null,
      data.frame1_label || null,
      data.frame1_word || null,
      data.frame1_bg || null,
      data.frame1_image || null,
      data.frame2_label || null,
      data.frame2_word || null,
      data.frame2_bg || null,
      data.frame2_image || null,
      data.brief_heading || null,
      data.brief_paras || null,
      data.what_heading || null,
      data.what_paras || null,
      data.outcome_heading || null,
      data.outcome_paras || null,
      id
    );
  },

  delete(id: string) {
    const stmt = db.prepare('DELETE FROM work_items WHERE id = ?');
    return stmt.run(id);
  }
};

// Services operations
export const services = {
  getAll(publishedOnly = false) {
    let query = 'SELECT * FROM services';
    if (publishedOnly) {
      query += ' WHERE published = 1';
    }
    query += ' ORDER BY homepage_order ASC, created_at DESC';
    const stmt = db.prepare(query);
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
      process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
      case_stats: row.case_stats ? JSON.parse(row.case_stats) : [],
      faqs: row.faqs ? JSON.parse(row.faqs) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    }));
  },

  getBySlug(slug: string) {
    const stmt = db.prepare('SELECT * FROM services WHERE slug = ?');
    const row = stmt.get(slug) as any;
    if (!row) return null;
    return {
      ...row,
      deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
      process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
      case_stats: row.case_stats ? JSON.parse(row.case_stats) : [],
      faqs: row.faqs ? JSON.parse(row.faqs) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    };
  },

  getById(id: string) {
    const stmt = db.prepare('SELECT * FROM services WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
      process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
      case_stats: row.case_stats ? JSON.parse(row.case_stats) : [],
      faqs: row.faqs ? JSON.parse(row.faqs) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    };
  },

  create(data: any) {
    const stmt = db.prepare(`
      INSERT INTO services (
        id, slug, title, short_title, icon, category, excerpt, featured_image,
        eyebrow, h1_text, lede, cta_label, visual_word,
        deliverables_title, deliverables, process_title, process_steps,
        case_title, case_desc, case_stats, case_link,
        faqs, cta_bottom, cta_bottom_btn,
        featured, homepage_order, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.id,
      data.slug,
      data.title,
      data.short_title || null,
      data.icon || null,
      data.category || null,
      data.excerpt || null,
      data.featured_image || null,
      data.eyebrow || null,
      data.h1_text || null,
      data.lede || null,
      data.cta_label || null,
      data.visual_word || null,
      data.deliverables_title || null,
      JSON.stringify(data.deliverables || []),
      data.process_title || null,
      JSON.stringify(data.process_steps || []),
      data.case_title || null,
      data.case_desc || null,
      JSON.stringify(data.case_stats || []),
      data.case_link || null,
      JSON.stringify(data.faqs || []),
      data.cta_bottom || null,
      data.cta_bottom_btn || null,
      data.featured ? 1 : 0,
      data.homepage_order || 0,
      data.published ? 1 : 0
    );
  },

  update(id: string, data: any) {
    const stmt = db.prepare(`
      UPDATE services SET
        slug = ?, title = ?, short_title = ?, icon = ?, category = ?, excerpt = ?, featured_image = ?,
        eyebrow = ?, h1_text = ?, lede = ?, cta_label = ?, visual_word = ?,
        deliverables_title = ?, deliverables = ?, process_title = ?, process_steps = ?,
        case_title = ?, case_desc = ?, case_stats = ?, case_link = ?,
        faqs = ?, cta_bottom = ?, cta_bottom_btn = ?,
        featured = ?, homepage_order = ?, published = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(
      data.slug,
      data.title,
      data.short_title || null,
      data.icon || null,
      data.category || null,
      data.excerpt || null,
      data.featured_image || null,
      data.eyebrow || null,
      data.h1_text || null,
      data.lede || null,
      data.cta_label || null,
      data.visual_word || null,
      data.deliverables_title || null,
      JSON.stringify(data.deliverables || []),
      data.process_title || null,
      JSON.stringify(data.process_steps || []),
      data.case_title || null,
      data.case_desc || null,
      JSON.stringify(data.case_stats || []),
      data.case_link || null,
      JSON.stringify(data.faqs || []),
      data.cta_bottom || null,
      data.cta_bottom_btn || null,
      data.featured ? 1 : 0,
      data.homepage_order || 0,
      data.published ? 1 : 0,
      id
    );
  },

  delete(id: string) {
    const stmt = db.prepare('DELETE FROM services WHERE id = ?');
    return stmt.run(id);
  }
};

// Initialize database on import
initializeDatabase();

export default db;


// Blog posts operations
export const blogPosts = {
  getAll(publishedOnly = false) {
    let query = 'SELECT * FROM blog_posts';
    if (publishedOnly) {
      query += ' WHERE published = 1';
    }
    query += ' ORDER BY published_date DESC, created_at DESC';
    const stmt = db.prepare(query);
    const rows = stmt.all() as any[];
    return rows.map(row => ({
      ...row,
      sections: row.sections ? JSON.parse(row.sections) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    }));
  },

  getBySlug(slug: string) {
    const stmt = db.prepare('SELECT * FROM blog_posts WHERE slug = ?');
    const row = stmt.get(slug) as any;
    if (!row) return null;
    return {
      ...row,
      sections: row.sections ? JSON.parse(row.sections) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    };
  },

  getById(id: string) {
    const stmt = db.prepare('SELECT * FROM blog_posts WHERE id = ?');
    const row = stmt.get(id) as any;
    if (!row) return null;
    return {
      ...row,
      sections: row.sections ? JSON.parse(row.sections) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    };
  },

  getFeatured() {
    const stmt = db.prepare('SELECT * FROM blog_posts WHERE published = 1 AND featured = 1 ORDER BY published_date DESC LIMIT 1');
    const row = stmt.get() as any;
    if (!row) return null;
    return {
      ...row,
      sections: row.sections ? JSON.parse(row.sections) : [],
      featured: Boolean(row.featured),
      published: Boolean(row.published)
    };
  },

  create(data: any) {
    const stmt = db.prepare(`
      INSERT INTO blog_posts (
        id, slug, title, excerpt, featured_image, gradient_bg,
        category, tag, author_name, author_role, read_time, published_date,
        content, sections, meta_description,
        featured, published
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.id,
      data.slug,
      data.title,
      data.excerpt || null,
      data.featured_image || null,
      data.gradient_bg || null,
      data.category || null,
      data.tag || null,
      data.author_name || null,
      data.author_role || null,
      data.read_time || null,
      data.published_date || null,
      data.content || null,
      JSON.stringify(data.sections || []),
      data.meta_description || null,
      data.featured ? 1 : 0,
      data.published ? 1 : 0
    );
  },

  update(id: string, data: any) {
    const stmt = db.prepare(`
      UPDATE blog_posts SET
        slug = ?, title = ?, excerpt = ?, featured_image = ?, gradient_bg = ?,
        category = ?, tag = ?, author_name = ?, author_role = ?, read_time = ?, published_date = ?,
        content = ?, sections = ?, meta_description = ?,
        featured = ?, published = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(
      data.slug,
      data.title,
      data.excerpt || null,
      data.featured_image || null,
      data.gradient_bg || null,
      data.category || null,
      data.tag || null,
      data.author_name || null,
      data.author_role || null,
      data.read_time || null,
      data.published_date || null,
      data.content || null,
      JSON.stringify(data.sections || []),
      data.meta_description || null,
      data.featured ? 1 : 0,
      data.published ? 1 : 0,
      id
    );
  },

  delete(id: string) {
    const stmt = db.prepare('DELETE FROM blog_posts WHERE id = ?');
    return stmt.run(id);
  },

  incrementViews(slug: string) {
    const stmt = db.prepare('UPDATE blog_posts SET views = views + 1 WHERE slug = ?');
    return stmt.run(slug);
  }
};
