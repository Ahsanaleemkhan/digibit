/**
 * MySQL Database layer for Hostinger
 * Replaces SQLite with MySQL for production compatibility
 */
import mysql from 'mysql2/promise';

// Database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
let pool: mysql.Pool | null = null;

try {
  pool = mysql.createPool(dbConfig);
  console.log('✅ MySQL connection pool created');
} catch (error) {
  console.error('❌ Failed to create MySQL pool:', error);
}

// Get connection from pool
export async function getConnection() {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }
  return await pool.getConnection();
}

// Initialize database schema
export async function initializeDatabase() {
  if (!pool) {
    console.warn('Database pool not available');
    return;
  }

  const conn = await getConnection();
  
  try {
    // CMS Content table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS cms_content (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_key VARCHAR(255) UNIQUE NOT NULL,
        content LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        updated_by VARCHAR(255),
        INDEX idx_page_key (page_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Submissions table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        type VARCHAR(50) NOT NULL,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(50),
        company VARCHAR(255),
        message TEXT,
        services TEXT,
        budget VARCHAR(100),
        timeline VARCHAR(100),
        data TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_type (type),
        INDEX idx_status (status),
        INDEX idx_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Admins table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        INDEX idx_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Blog posts table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        excerpt TEXT,
        featured_image VARCHAR(500),
        gradient_bg VARCHAR(200),
        category VARCHAR(100),
        tag VARCHAR(100),
        author_name VARCHAR(255),
        author_role VARCHAR(255),
        read_time VARCHAR(50),
        published_date VARCHAR(50),
        content LONGTEXT,
        sections LONGTEXT,
        meta_description TEXT,
        featured TINYINT(1) DEFAULT 0,
        published TINYINT(1) DEFAULT 0,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_published (published),
        INDEX idx_category (category),
        INDEX idx_featured (featured)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Theme settings table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS theme_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        \`key\` VARCHAR(255) UNIQUE NOT NULL,
        value LONGTEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Media library table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS media (
        id INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(500) NOT NULL,
        original_name VARCHAR(500) NOT NULL,
        mime_type VARCHAR(100) NOT NULL,
        size INT NOT NULL,
        path VARCHAR(500) NOT NULL,
        alt_text TEXT,
        caption TEXT,
        uploaded_by VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_media_created (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Services table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        short_title VARCHAR(255),
        icon VARCHAR(100),
        category VARCHAR(100),
        excerpt TEXT,
        featured_image VARCHAR(500),
        eyebrow VARCHAR(255),
        h1_text TEXT,
        lede TEXT,
        cta_label VARCHAR(255),
        visual_word VARCHAR(255),
        deliverables_title VARCHAR(255),
        deliverables LONGTEXT,
        process_title VARCHAR(255),
        process_steps LONGTEXT,
        case_title VARCHAR(255),
        case_desc TEXT,
        case_stats LONGTEXT,
        case_link VARCHAR(500),
        faqs LONGTEXT,
        cta_bottom TEXT,
        cta_bottom_btn VARCHAR(255),
        featured TINYINT(1) DEFAULT 0,
        homepage_order INT DEFAULT 0,
        published TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_service_slug (slug),
        INDEX idx_service_published (published),
        INDEX idx_service_homepage_order (homepage_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Work items table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS work_items (
        id VARCHAR(100) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(500) NOT NULL,
        category VARCHAR(100),
        excerpt TEXT,
        featured_image VARCHAR(500),
        client VARCHAR(255),
        year VARCHAR(20),
        services LONGTEXT,
        challenge TEXT,
        solution TEXT,
        results LONGTEXT,
        gallery_images LONGTEXT,
        testimonial_quote TEXT,
        testimonial_author VARCHAR(255),
        testimonial_role VARCHAR(255),
        published TINYINT(1) DEFAULT 0,
        timeline VARCHAR(255),
        h1_text TEXT,
        lede TEXT,
        visual_bg VARCHAR(255),
        visual_word VARCHAR(255),
        visual_image VARCHAR(500),
        frame1_label VARCHAR(255),
        frame1_word VARCHAR(255),
        frame1_bg VARCHAR(255),
        frame1_image VARCHAR(500),
        frame2_label VARCHAR(255),
        frame2_word VARCHAR(255),
        frame2_bg VARCHAR(255),
        frame2_image VARCHAR(500),
        brief_heading VARCHAR(500),
        brief_paras LONGTEXT,
        what_heading VARCHAR(500),
        what_paras LONGTEXT,
        outcome_heading VARCHAR(500),
        outcome_paras LONGTEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_work_slug (slug),
        INDEX idx_work_published (published)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database tables initialized');
  } catch (error) {
    console.error('❌ Failed to initialize tables:', error);
    throw error;
  } finally {
    conn.release();
  }
}

// CMS Content operations
export const cmsContent = {
  async getByKey(pageKey: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM cms_content WHERE page_key = ?',
        [pageKey]
      );
      if (rows.length === 0) return null;
      return {
        ...rows[0],
        content: JSON.parse(rows[0].content)
      };
    } catch (error) {
      console.error(`Error fetching ${pageKey}:`, error);
      return null;
    }
  },

  async getAll() {
    if (!pool) return [];
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM cms_content ORDER BY page_key'
      );
      return rows.map((row: any) => ({
        ...row,
        content: JSON.parse(row.content)
      }));
    } catch (error) {
      console.error('Error fetching all content:', error);
      return [];
    }
  },

  async upsert(pageKey: string, content: any, updatedBy?: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO cms_content (page_key, content, updated_by)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE
         content = VALUES(content),
         updated_by = VALUES(updated_by),
         updated_at = CURRENT_TIMESTAMP`,
        [pageKey, JSON.stringify(content), updatedBy || null]
      );
      return result;
    } catch (error) {
      console.error(`Error upserting ${pageKey}:`, error);
      return null;
    }
  },

  async delete(pageKey: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM cms_content WHERE page_key = ?',
        [pageKey]
      );
      return result;
    } catch (error) {
      console.error(`Error deleting ${pageKey}:`, error);
      return null;
    }
  }
};

// Admin operations
export const admins = {
  async getAll() {
    if (!pool) return [];
    try {
      const [rows] = await pool.query(
        'SELECT id, email, name, role, created_at, last_login FROM admins'
      );
      return rows;
    } catch (error) {
      console.error('Error fetching admins:', error);
      return [];
    }
  },

  async getByEmail(email: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM admins WHERE email = ?',
        [email]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error fetching admin by email:', error);
      return null;
    }
  },

  async create(email: string, password: string, name: string, role = 'admin') {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'INSERT INTO admins (email, password, name, role) VALUES (?, ?, ?, ?)',
        [email, password, name, role]
      );
      return result;
    } catch (error) {
      console.error('Error creating admin:', error);
      return null;
    }
  },

  async updateLastLogin(email: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'UPDATE admins SET last_login = CURRENT_TIMESTAMP WHERE email = ?',
        [email]
      );
      return result;
    } catch (error) {
      console.error('Error updating last login:', error);
      return null;
    }
  },

  async updatePassword(email: string, hashedPassword: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'UPDATE admins SET password = ? WHERE email = ?',
        [hashedPassword, email]
      );
      return result;
    } catch (error) {
      console.error('Error updating password:', error);
      return null;
    }
  },

  async delete(id: number) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM admins WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting admin:', error);
      return null;
    }
  }
};

// Submissions operations
export const submissions = {
  async getAll(type?: string, status?: string) {
    if (!pool) return [];
    try {
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
      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching submissions:', error);
      return [];
    }
  },

  async getById(id: number) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM submissions WHERE id = ?',
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error fetching submission:', error);
      return null;
    }
  },

  async create(data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO submissions (
          type, name, email, phone, company, message,
          services, budget, timeline, data, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error creating submission:', error);
      return null;
    }
  },

  async updateStatus(id: number, status: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'UPDATE submissions SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        [status, id]
      );
      return result;
    } catch (error) {
      console.error('Error updating submission status:', error);
      return null;
    }
  },

  async delete(id: number) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM submissions WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting submission:', error);
      return null;
    }
  }
};

// Blog posts operations
export const blogPosts = {
  async getAll(publishedOnly = false) {
    if (!pool) return [];
    try {
      let query = 'SELECT * FROM blog_posts';
      if (publishedOnly) {
        query += ' WHERE published = 1';
      }
      query += ' ORDER BY published_date DESC, created_at DESC';
      const [rows]: any = await pool.query(query);
      return rows.map((row: any) => ({
        ...row,
        sections: row.sections ? JSON.parse(row.sections) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      }));
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
  },

  async getBySlug(slug: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM blog_posts WHERE slug = ?',
        [slug]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        sections: row.sections ? JSON.parse(row.sections) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching blog post:', error);
      return null;
    }
  },

  async getById(id: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM blog_posts WHERE id = ?',
        [id]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        sections: row.sections ? JSON.parse(row.sections) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching blog post by id:', error);
      return null;
    }
  },

  async getFeatured() {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM blog_posts WHERE published = 1 AND featured = 1 ORDER BY published_date DESC LIMIT 1'
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        sections: row.sections ? JSON.parse(row.sections) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching featured blog post:', error);
      return null;
    }
  },

  async incrementViews(slug: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'UPDATE blog_posts SET views = views + 1 WHERE slug = ?',
        [slug]
      );
      return result;
    } catch (error) {
      console.error('Error incrementing blog views:', error);
      return null;
    }
  },

  async create(data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO blog_posts (
          id, slug, title, excerpt, featured_image, gradient_bg,
          category, tag, author_name, author_role, read_time, published_date,
          content, sections, meta_description, featured, published
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error creating blog post:', error);
      return null;
    }
  },

  async update(id: string, data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `UPDATE blog_posts SET
          slug = ?, title = ?, excerpt = ?, featured_image = ?, gradient_bg = ?,
          category = ?, tag = ?, author_name = ?, author_role = ?, read_time = ?,
          published_date = ?, content = ?, sections = ?, meta_description = ?,
          featured = ?, published = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
  },

  async delete(id: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM blog_posts WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return null;
    }
  }
};

// Theme settings operations
export const themeSettings = {
  async get(key: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT value FROM theme_settings WHERE `key` = ?',
        [key]
      );
      return rows.length > 0 ? JSON.parse(rows[0].value) : null;
    } catch (error) {
      console.error('Error fetching theme setting:', error);
      return null;
    }
  },

  async getAll() {
    if (!pool) return {} as Record<string, any>;
    try {
      const [rows]: any = await pool.query('SELECT * FROM theme_settings');
      return rows.reduce((acc: Record<string, any>, row: any) => {
        acc[row.key] = JSON.parse(row.value);
        return acc;
      }, {} as Record<string, any>);
    } catch (error) {
      console.error('Error fetching theme settings:', error);
      return {} as Record<string, any>;
    }
  },

  async set(key: string, value: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO theme_settings (\`key\`, value)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE
         value = VALUES(value),
         updated_at = CURRENT_TIMESTAMP`,
        [key, JSON.stringify(value)]
      );
      return result;
    } catch (error) {
      console.error('Error setting theme:', error);
      return null;
    }
  }
};

// Media operations
export const media = {
  async getAll() {
    if (!pool) return [];
    try {
      const [rows] = await pool.query('SELECT * FROM media ORDER BY created_at DESC');
      return rows;
    } catch (error) {
      console.error('Error fetching media:', error);
      return [];
    }
  },

  async getById(id: number) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM media WHERE id = ?',
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      console.error('Error fetching media by id:', error);
      return null;
    }
  },

  async create(data: {
    filename: string;
    original_name: string;
    mime_type: string;
    size: number;
    path: string;
    alt_text?: string;
    caption?: string;
    uploaded_by?: string;
  }) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO media (
          filename, original_name, mime_type, size, path,
          alt_text, caption, uploaded_by
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.filename,
          data.original_name,
          data.mime_type,
          data.size,
          data.path,
          data.alt_text || null,
          data.caption || null,
          data.uploaded_by || null
        ]
      );
      return result;
    } catch (error) {
      console.error('Error creating media:', error);
      return null;
    }
  },

  async update(id: number, data: { alt_text?: string; caption?: string }) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'UPDATE media SET alt_text = ?, caption = ? WHERE id = ?',
        [data.alt_text || null, data.caption || null, id]
      );
      return result;
    } catch (error) {
      console.error('Error updating media:', error);
      return null;
    }
  },

  async delete(id: number) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM media WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting media:', error);
      return null;
    }
  }
};

// Work items operations
export const workItems = {
  async getAll(publishedOnly = false) {
    if (!pool) return [];
    try {
      let query = 'SELECT * FROM work_items';
      if (publishedOnly) query += ' WHERE published = 1';
      query += ' ORDER BY year DESC, created_at DESC';
      const [rows]: any = await pool.query(query);
      return rows.map((row: any) => ({
        ...row,
        services: row.services ? JSON.parse(row.services) : [],
        results: row.results ? JSON.parse(row.results) : [],
        gallery_images: row.gallery_images ? JSON.parse(row.gallery_images) : [],
        published: Boolean(row.published)
      }));
    } catch (error) {
      console.error('Error fetching work items:', error);
      return [];
    }
  },

  async getBySlug(slug: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM work_items WHERE slug = ?',
        [slug]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        services: row.services ? JSON.parse(row.services) : [],
        results: row.results ? JSON.parse(row.results) : [],
        gallery_images: row.gallery_images ? JSON.parse(row.gallery_images) : [],
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching work item by slug:', error);
      return null;
    }
  },

  async getById(id: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM work_items WHERE id = ?',
        [id]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        services: row.services ? JSON.parse(row.services) : [],
        results: row.results ? JSON.parse(row.results) : [],
        gallery_images: row.gallery_images ? JSON.parse(row.gallery_images) : [],
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching work item by id:', error);
      return null;
    }
  },

  async create(data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO work_items (
          id, slug, title, category, excerpt, featured_image,
          client, year, services, challenge, solution, results,
          gallery_images, testimonial_quote, testimonial_author,
          testimonial_role, published,
          timeline, h1_text, lede, visual_bg, visual_word, visual_image,
          frame1_label, frame1_word, frame1_bg, frame1_image,
          frame2_label, frame2_word, frame2_bg, frame2_image,
          brief_heading, brief_paras, what_heading, what_paras,
          outcome_heading, outcome_paras
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error creating work item:', error);
      return null;
    }
  },

  async update(id: string, data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `UPDATE work_items SET
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
        WHERE id = ?`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error updating work item:', error);
      return null;
    }
  },

  async delete(id: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM work_items WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting work item:', error);
      return null;
    }
  }
};

// Services operations
export const services = {
  async getAll(publishedOnly = false) {
    if (!pool) return [];
    try {
      let query = 'SELECT * FROM services';
      if (publishedOnly) query += ' WHERE published = 1';
      query += ' ORDER BY homepage_order ASC, created_at DESC';
      const [rows]: any = await pool.query(query);
      return rows.map((row: any) => ({
        ...row,
        deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
        process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
        case_stats: row.case_stats ? JSON.parse(row.case_stats) : [],
        faqs: row.faqs ? JSON.parse(row.faqs) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      }));
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  async getBySlug(slug: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM services WHERE slug = ?',
        [slug]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
        process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
        case_stats: row.case_stats ? JSON.parse(row.case_stats) : [],
        faqs: row.faqs ? JSON.parse(row.faqs) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching service by slug:', error);
      return null;
    }
  },

  async getById(id: string) {
    if (!pool) return null;
    try {
      const [rows]: any = await pool.query(
        'SELECT * FROM services WHERE id = ?',
        [id]
      );
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...row,
        deliverables: row.deliverables ? JSON.parse(row.deliverables) : [],
        process_steps: row.process_steps ? JSON.parse(row.process_steps) : [],
        case_stats: row.case_stats ? JSON.parse(row.case_stats) : [],
        faqs: row.faqs ? JSON.parse(row.faqs) : [],
        featured: Boolean(row.featured),
        published: Boolean(row.published)
      };
    } catch (error) {
      console.error('Error fetching service by id:', error);
      return null;
    }
  },

  async create(data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `INSERT INTO services (
          id, slug, title, short_title, icon, category, excerpt, featured_image,
          eyebrow, h1_text, lede, cta_label, visual_word,
          deliverables_title, deliverables, process_title, process_steps,
          case_title, case_desc, case_stats, case_link,
          faqs, cta_bottom, cta_bottom_btn,
          featured, homepage_order, published
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error creating service:', error);
      return null;
    }
  },

  async update(id: string, data: any) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        `UPDATE services SET
          slug = ?, title = ?, short_title = ?, icon = ?, category = ?, excerpt = ?, featured_image = ?,
          eyebrow = ?, h1_text = ?, lede = ?, cta_label = ?, visual_word = ?,
          deliverables_title = ?, deliverables = ?, process_title = ?, process_steps = ?,
          case_title = ?, case_desc = ?, case_stats = ?, case_link = ?,
          faqs = ?, cta_bottom = ?, cta_bottom_btn = ?,
          featured = ?, homepage_order = ?, published = ?,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ?`,
        [
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
        ]
      );
      return result;
    } catch (error) {
      console.error('Error updating service:', error);
      return null;
    }
  },

  async delete(id: string) {
    if (!pool) return null;
    try {
      const [result] = await pool.query(
        'DELETE FROM services WHERE id = ?',
        [id]
      );
      return result;
    } catch (error) {
      console.error('Error deleting service:', error);
      return null;
    }
  }
};

export default pool;
