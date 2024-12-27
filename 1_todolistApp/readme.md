tsc -init

# tsconfig.json 
## start ##
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution":"node",
    "baseUrl": "./",
    "paths": {
      "*": ["node_modules/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
## end ##

npm init -y

# typescript 의존성 추가
# @types : typescript 타입이 호환 되도록 제공하는 라이브러리 옵션
npm i -D @types/node 
npm i -D @types/readline-sync

# 일반 node 실행을 위한 의존성 추가  
npm i node 
npm i readline-sync

