import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

const PORT = process.env.PORT || 5001

MongoHelper.connect(process.env.MONGO_URL!)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`)
    })
  })
  .catch(console.error)
