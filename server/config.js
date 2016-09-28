module.exports = {

    'secret': 'supersecretblog',
    'database': process.env.DATABASE_URL || 'mongodb://localhost:27017/blog'

};