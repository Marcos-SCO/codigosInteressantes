Tutorial link: https://www.youtube.com/watch?v=mmjQ280wnIw&ab_channel=AdnanHalilovic

# Install the lib

npm i prisma typescript ts-node @types/node --save-dev


# Some of Prisma commands

- To migrate a created schema table : 
 - npx prisma migrate dev --name youtube_channels_table init


# Execute a prisma TS files

- Create
 - ts-node src/create

- Read
 - ts-node src/read

- Update
 - ts-node src/update

- Delete
 - ts-node src/delete