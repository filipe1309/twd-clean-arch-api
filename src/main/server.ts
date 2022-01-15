import 'module-alias/register'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

const PORT = process.env.PORT || 5001
const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:123mudar@localhost:27017'

MongoHelper.connect(MONGO_URL!)
  .then(async () => {
    console.log(`Connected to MongoDB at ${MONGO_URL}`)
    const app = (await import('./config/app')).default
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`)
    })
  })
  .catch(console.error)
