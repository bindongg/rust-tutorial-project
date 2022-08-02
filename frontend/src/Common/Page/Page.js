import Pagination from "react-js-pagination"
import "./Page.css";
import {useEffect, useState} from "react";
function Page(props)
{
    const [index,setIndex] = useState(1);
    function onClickHandler(pageNum)
    {
        setIndex(pageNum);
    }
    useEffect(()=>{
        props.setPage(index-1);
    },[index]);

    return(
        <Pagination className="justify-content-center"
                    activePage={index}
                    itemsCountPerPage={props.recPerPage}
                    totalItemsCount={props.total}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    pageRangeDisplayed={5}
                    onChange={onClickHandler}
        />
    );
}

export default Page;