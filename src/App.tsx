import React, { ChangeEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function App() {
  interface StockDetails {
    title: string;
    url: string;
    image: string;
    date: string;
    body: string;
    source: string;
    author: string;
  }
  const [stockDetails, setStockDetails] = useState<StockDetails[]>([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [category, setCategory] = useState<string[]>([]);
  const [author, setAuthor] = useState<string[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [authorFilter, setAuthorFilter] = useState<string[]>([]);
  const [dateSort, setDateSort] = useState<string>();
  const [titleSort, setTitleSort] = useState<string>();
  const [filteredData, setFilteredData] = useState<StockDetails[]>([]);




  useEffect(()=>{
    fetch("https://dummy-rest-api.specbee.site/api/v1/news")
    .then((res)=>res.json())
    .then(data => {
      console.log(data)
      setStockDetails(data);
      setFilteredData(data);
      console.log("stockDetails",stockDetails);
      let categoryArr: string[] = [];
      let authorArr: string[] = [];
      data.map((item : StockDetails) =>{
        categoryArr.push(item.source);
        authorArr.push(item.author);
      } )
      setCategory([...new Set(categoryArr)]);
      setAuthor([...new Set(authorArr)]);
    })
    handleFilters()
  },[])

  // function formatDate(inputDate: string) {
  //   const date = new Date(inputDate);
  
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };

    
  //     return new Intl.DateTimeFormat("en-US", options).format(date);
      
  // }


  const handleChangePage = (event: any, value: React.SetStateAction<number>) => {
    setPage(value);
  };

  const handleCategoryFilters = (event: ChangeEvent<HTMLInputElement>) =>{  
    
    let existing = categoryFilter;

    if(event.target.checked){
      setCategoryFilter([...existing, event.target.value]);
    } else {
      const index = existing.indexOf(event.target.value);
      existing.splice(index, 1)
      setCategoryFilter(existing)
    } 
      console.log(categoryFilter);
  }
  const handleAuthorFilters = (event: ChangeEvent<HTMLInputElement>) =>{
      setAuthorFilter([...authorFilter, event.target.value])
      console.log("authorFilter",authorFilter)
      handleFilters()
  }
  const handleDateSort = (event: ChangeEvent<HTMLInputElement>) =>{
      setDateSort(event.target.value)
  }
  const handleTitleSort = (event: ChangeEvent<HTMLInputElement>) =>{
      setTitleSort(event.target.value)
  }

  const handleFilters = () =>{   
   let filtered : StockDetails[] = stockDetails;
   console.log(filtered)
   console.log(categoryFilter)
   
    if(categoryFilter.length > 0){
        filtered=filtered.filter((item)=> categoryFilter.includes(item.source))
    }  
    if(authorFilter.length > 0){
        filtered=filtered.filter((item)=> authorFilter.includes(item.author))
    }     
    if(authorFilter.length == 0 && categoryFilter.length == 0){
      filtered = stockDetails;
    }
    setFilteredData(filtered)
    console.log("filtered", filtered)
  }


  return (
    <div className="App">
      <div className="main-container">
        <div className="left-container">
          <div className="filtersContainer">
             <div>
                <p className="category">Category</p>
                <div className="filter-checkbox-container">
                  {category ? category.map((item,index)=>(
                    <p key={index}><input type="checkbox" value={item} onChange={(e)=>handleCategoryFilters(e)} />{item} </p>
                  )) : null}
                </div>
             </div>
             <div>
                <p className="category">Author</p>
                <div className="filter-checkbox-container">
                    {author ? author.map((item, index)=>(
                        <p key={index}><input type="checkbox" value={item} onChange={()=>handleAuthorFilters}/>{item}</p>
                    )) : null}
                </div>
             </div>
             <div>
                <p className="category">Sort By</p>
                <div className="filter-checkbox-container">
                    <p><input type="checkbox" value="Date" onChange={()=>handleDateSort} /> Date</p>
                    <p><input type="checkbox" value="Title" onChange={()=>handleTitleSort} /> Title</p>
                </div>
             </div>
          </div>
        </div>
        <div className="right-container">
        {(rowsPerPage > 0
              ? filteredData?.slice(
                  (page - 1) * rowsPerPage,
                  (page - 1) * rowsPerPage + rowsPerPage
                )
              : filteredData)?.map((row, index)=>{
            return (<div className="border-bottom" key={index}>
            <div className="half-containers">
                  <div className="image-div">
                      <img className="stock-image" src={`https://dummy-rest-api.specbee.site/${row.image}`} />                
                  </div>
                  <div className="title-div">
                          <p className="title-date-cat">
                            <span className="stock-date">{row.date}</span>
                            <span className="stock-category">{row.source}</span>
                          </p><br/>
                          <div className="title-text" dangerouslySetInnerHTML={{ __html: row.title }} />
                          
                  </div>
              </div>
              <div>
                    <div  className="description" dangerouslySetInnerHTML={{ __html: row.body }} />
                <br/>
                <p className='author'>{row.author}</p>
              </div>
        </div> )
        })} 
         <Stack spacing={2} className="pagination">
            <Pagination
             count={Math.ceil(filteredData.length/rowsPerPage)}
             page={page}
             onChange={handleChangePage}
             />
          </Stack>                   
        </div>
      </div>
    </div>
  );
}

export default App;
