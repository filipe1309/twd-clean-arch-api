import 'module-alias/register'
import app from '@/main/config/app'

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`)
})
