let arr = [
    { category_id: 1, category_name: 'groceries', parent: null },
    { category_id: 2, category_name: 'health & beauty', parent: null },
    { category_id: 3, category_name: 'fashion', parent: null },
    { category_id: 4, category_name: 'beverages', parent: 1 },
    { category_id: 5, category_name: 'snacks', parent: 1 },
    { category_id: 6, category_name: 'frozen foods', parent: 1 },
    { category_id: 7, category_name: 'medicine', parent: 2 },
    { category_id: 8, category_name: 'utilities', parent: 2 },
    { category_id: 9, category_name: 'cosmetics', parent: 2 }
]


//   console.log(arr.length)

//   delete arr[8];
//   console.log(arr.length)

// //   console.log(arr)


  for(i in arr)
  {
      if(!arr[i].parent)
        {

            delete arr[i].parent;
            arr[i].childCategories = [];
            arr[i].showChildren = false;
            for (j = 0; j < arr.length; j++)
            {
                console.log(arr[j]);
                if(arr[i].category_id === arr[j].parent)
                {
                    arr[i].childCategories.push(arr[j])
                    arr.splice(j,1);
                    j--;
                }
                // console.log(j);

            }
        }
  }

//   console.log(JSON.stringify(arr));
  console.log(arr);
