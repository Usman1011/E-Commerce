/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [category_id]
      ,[category_name]
      ,[parent]
  FROM [E-Commerce].[dbo].[Categories]

  truncate table dbo.categories

  insert into dbo.Categories (category_id, category_name) values 
  (1, 'groceries'), (2, 'health & beauty'), (3, 'fashion');

  insert into dbo.Categories (category_id, category_name, parent) values 
  (4, 'beverages', 1), (5, 'snacks', 1), (6, 'frozen foods', 1);


  insert into dbo.Categories (category_id, category_name, parent) values 
  (7, 'medicine', 2), (8, 'utilities', 2), (9, 'cosmetics', 2);


  SELECT * 
  FROM Categories
  WHERE category_id = 1 OR parent = 1;