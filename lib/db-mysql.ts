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

export default pool;
