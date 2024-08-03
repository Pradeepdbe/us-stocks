import React, { ChangeEvent, useEffect, useState } from 'react';
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

  useEffect(()=>{
    handleFilters()
  },[categoryFilter,authorFilter,dateSort,titleSort])


  function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const longMonthName = monthNames[date.getMonth()-1];
    const year = date.getFullYear();
    const day = date.getDay();
    return `${longMonthName} ${day}, ${year}`;
      
  }


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
      handleFilters()
    } 
  }
  const handleAuthorFilters = (event: ChangeEvent<HTMLInputElement>) =>{
      let existing = authorFilter;

    if(event.target.checked){
        setAuthorFilter([...authorFilter, event.target.value]);
    } else {
        const index = existing.indexOf(event.target.value);
        existing.splice(index, 1)
        setAuthorFilter(existing)
        handleFilters()
    } 
  }
  const handleDateSort = (event: ChangeEvent<HTMLInputElement>) =>{
      setDateSort(event.target.value)
      if(event.target.checked){
        filteredData.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
        console.log(filteredData)
        setFilteredData(filteredData)
      }   
  }
  const handleTitleSort = (event: ChangeEvent<HTMLInputElement>) =>{
      setTitleSort(event.target.value)
      if(event.target.checked){
        filteredData.sort(function(a,b){
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return ('' + a.title).localeCompare(b.title);
        });
        console.log(filteredData)
        setFilteredData(filteredData)
      }   
  }

  const handleFilters = () =>{   
      let filtered : StockDetails[] = stockDetails;
        if(categoryFilter.length > 0){
            filtered=filtered.filter((item)=> categoryFilter.includes(item.source))
        }  
        if(authorFilter.length > 0){
            filtered=filtered.filter((item)=> authorFilter.includes(item.author))
        }     
        if(authorFilter.length == 0 && categoryFilter.length == 0){
          filtered = stockDetails;
        }
        setFilteredData(filtered);
        setPage(1)
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
                        <p key={index}><input type="checkbox" value={item} onChange={(e)=>handleAuthorFilters(e)}/>{item}</p>
                    )) : null}
                </div>
             </div>
             <div>
                <p className="category">Sort By</p>
                <div className="filter-checkbox-container">
                    <p><input type="checkbox" value="Date" onChange={(e)=>handleDateSort(e)} /> Date</p>
                    <p><input type="checkbox" value="Title" onChange={(e)=>handleTitleSort(e)} /> Title</p>
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
                            <span className="stock-date">{formatDate(row.date)}</span>
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
