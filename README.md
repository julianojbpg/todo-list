
### npm i -g @nestjs/cli
### nest new project-name

instala dotenv para usar o process.env
### npm install dotenv --save
import 'dotenv/config'

### npm install --save-dev nodemon ts-node typescript
  Configure o script dev no package.json
  "dev": "nodemon --exec ts-node src/main.ts"

instala o prisma
###  npm install prisma --save-dev

### npx prisma init
### npx prisma generate
### npx prisma migrate dev --name init

validação com yup
### npm i yup