import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbarboot from '../../components/Header/Navbarboot';
import { Link } from 'react-router-dom';
import { Apiurl } from '../../Apiurl/Apiurl';
import './Exam_sharing_list.css';
import Dropdownbutton from '../../components/Button/Dropdownbutton';
import PaginationBasic from '../../components/Header/PaginationBasic';
import { useNavigate } from 'react-router-dom';

const CommonTableRow = ({ children }) => {
  return (
    <tr className="common-table-row">
      {children}
    </tr>
  );
}

const CommonTableColumn = ({ children }) => {
  return (
    <td className="common-table-column">
      {children}
    </td>
  );
}

const CommonTable = (props) => {
  const { headersName, children } = props;

  return (
    <table className="common-table">
      <thead>
        <tr>
          {
            headersName.map((item, index) => {
              return (
                <th className="common-table-header-column" key={index}>{item}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  );
}

const Exam_sharing_list = props => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [rankmenu, setRankmenu] = useState(1);

  const getBoardList = async (currentPage, postsPerPage) => {
    try{
      const resp = await axios.get(`${Apiurl.exam_sharing_board_get_list}`, {
            params: {
              page: currentPage
            }
          });
          setBoardList(resp);
          setPosts(resp.data.Board_info);
    }catch(error){
      navigate('/error');
    }
  }

  useEffect(() => {
    getBoardList(currentPage, postsPerPage);
  }, [currentPage, postsPerPage]);

  return (
    <>
      <Navbarboot></Navbarboot>
      
      <div className='flex-body'> 
        <div className='header-container'>
          <span className="study-title">족보게시판</span>
          <div className='Dropbutton'><Dropdownbutton postlist={posts} menurank={setRankmenu}></Dropdownbutton></div>
        </div>
        <div className='boardlist-table'>
          <CommonTable headersName={['제목', '내용', '등록일', '조회수']}>
            {
              posts ? posts.map((item, index) => {
                return (
                  <CommonTableRow key={index} >
                    <CommonTableColumn><Link to={`/Exam_sharingBoardview/${item.Board_no}`}>{item.Title}</Link></CommonTableColumn>
                    <CommonTableColumn><Link to={`/Exam_sharingBoardview/${item.Board_no}`}>{item.Content}</Link></CommonTableColumn>
                    <CommonTableColumn><Link to={`/Exam_sharingBoardview/${item.Board_no}`}>{item.Create_date}</Link></CommonTableColumn>
                    <CommonTableColumn><Link to={`/Exam_sharingBoardview/${item.Board_no}`}>{item.Views}</Link></CommonTableColumn>
                  </CommonTableRow>
                )
              }) : ''
            }
          </CommonTable>
        </div>
        <div className='boardcreate-button'><Link to="/Exam_sharingBoardcreate"><button>게시물 쓰기</button></Link></div>
        <div className="pagination-basic"><PaginationBasic postsPerPage={postsPerPage} totalPosts={posts.length} paginate={setCurrentPage} currentPagPage={currentPage + 1}></PaginationBasic></div>
      </div>
    </>
  );
}

export default Exam_sharing_list;