import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n/LanguageProvider';

const BlogCard = ({ date, title, excerpt, readSoon }) => (
  <motion.article 
    className="p-xl bg-surface border border-border flex flex-col transition-colors hover:border-title/30 h-full"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6 }}
  >
    <p className="text-xs text-muted uppercase tracking-[0.1em] mb-sm">{date}</p>
    <h2 className="text-2xl font-title text-title mb-md">{title}</h2>
    <p className="text-body text-base leading-relaxed mb-xl flex-grow">
      {excerpt}
    </p>
    <span className="inline-block mt-auto px-lg py-sm bg-transparent border border-border text-muted text-xs uppercase tracking-widest cursor-not-allowed opacity-50 text-center">
      {readSoon}
    </span>
  </motion.article>
);

const Blog = () => {
  const { content } = useI18n();
  const blog = content.blog;
  const posts = blog.posts;

  return (
    <div className="min-h-screen bg-bg">
      {/* Blog Hero */}
      <section className="pt-3xl pb-2xl bg-section-sage text-light text-center px-lg">
        <div className="container mx-auto max-w-[800px]">
          <motion.p 
            className="text-xs uppercase tracking-[0.2em] mb-sm opacity-80"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          >
            {blog.eyebrow}
          </motion.p>
          <motion.h1 
            className="text-4xl md:text-5xl font-title font-light mb-md leading-tight"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            {blog.title}
          </motion.h1>
          <motion.p 
            className="text-lg opacity-90 leading-relaxed max-w-prose mx-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            {blog.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-3xl">
        <div className="container mx-auto px-lg">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {posts.map((post, index) => (
              <BlogCard key={index} {...post} readSoon={blog.readSoon} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
