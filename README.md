# 美食餐廳清單 (MongoDB CRUD版) - Favourite Restaurant List (MongoDB CRUD version)

利用MongoDB去製作的美食餐廳清單系統。

## Features - 產品功能

1. 使用者可以新增一家餐廳
2. 使用者可以瀏覽一家餐廳的詳細資訊
3. 使用者可以瀏覽全部所有餐廳
4. 使用者可以修改一家餐廳的資訊
5. 使用者可以刪除一家餐廳
6. 使用者可以搜尋一家餐廳

## Prerequisites - 系統需求

1. [Node.js] v14.15.1 (https://nodejs.org/en/)

## Installation - 安裝流程

1. Install [nvm] (https://github.com/nvm-sh/nvm) - 安裝nvm，nodejs的管理系統

2. Use [nvm] to install [nodejs] v14.15.1 - 利用nvm去安裝及使用nodejs ver.14.15.1
```
nvm install 14.15.1
nvm use 14.15.1
```

3. Download and extract [MongoDB] (https://www.mongodb.com/try/download/community) v4.4.2 - 下載並且解壓 MongoDB version 4.4.2

4. In [Terminal], cd to the extracted [MongoDB] folder.  Then run the following in [Terminal] to create a folder same level as the [MongoDB] folder. - 在MongoDB的同一層利用以下command在[Terminal]中建立一個新的data資料夾
```
mkdir ../mongodb-data
```

4. Prepare [MongoDB] Database with sample data. Run the command below in terminal - 預先加入Sample data，請在終端機執行以下指令
```
npm run seed
```

5. Start the web application, run the command below in terminal - 啟動專案，請在終端機執行以下指令
```
npm run start
```

## Contributor

> [Thumper](https://github.com/thumperL)