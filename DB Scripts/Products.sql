/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [productId]
      ,[productTitle]
      ,[productDescription]
      ,[UserUserName]
      ,[category]
  FROM [E-Commerce].[dbo].[Products]


  truncate table dbo.Products

	insert into dbo.Products (productTitle, UserUserName, category) values 
	('Panadol', 'usmanadmin', 7),
	('Inocita', 'usmanadmin', 7),
	('Paracetamol', 'usmanadmin', 7),
	('Lotion', 'usmanadmin', 9),
	('Facewash', 'usmanadmin', 9),
	('Cocomo', 'usmanadmin', 5),
	('Oreo', 'usmanadmin', 5)


	SELECT * 
	FROM Products
	where category in (
		SELECT category_id 
		FROM Categories
		WHERE parent = 1
	);


	SELECT P.*
	FROM Products p
	INNER JOIN Categories c
	on p.category = c.category_id
	where c.parent = 2