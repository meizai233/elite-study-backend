module.exports = {
  apps: [
    {
      name: 'backend-course-pc',
      exec_mode: 'cluster',
      instances: 'max',
      script: './app.js'
    }
  ]
}