import { FC } from 'react';
import './fab.css';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Home } from '@src/assets/icons/home.svg';
import { ReactComponent as CheckList } from '@src/assets/icons/checklist.svg';
import { ReactComponent as Favorite } from '@src/assets/icons/favorite.svg';
import { addCheckList } from '@apis/checkList.Api';
interface FabButtonProps { }

const FabButton: FC<FabButtonProps> = () => {
  const navigate = useNavigate();
  const onClickHandle = async () => {
    const data = await addCheckList();
    navigate(`/checklists/${data.checklistId}`);
  };
  return (
    <>
      <div className="fab-container">
        <div className="fab fab-icon-holder">
          <i className="fas fa-question"></i>
        </div>

        <ul className="fab-options">
          <li>
            <span onClick={() => {
              navigate(`/checklists`)
            }} className="fab-label w-20 text-center cursor-pointer">장보기 내역</span>
            <div onClick={() => {
              navigate(`/checklists`)
            }} className="fab-icon-holder cursor-pointer">
              <i className="fas fa-video ">
                <CheckList width="70%" height="70%" />
              </i>
            </div>
          </li>
          <li className=''>
            <span onClick={() => navigate('/favorite')} className="fab-label w-20 text-center cursor-pointer">즐겨찾기</span>
            <div onClick={() => navigate('/favorite')} className="fab-icon-holder cursor-pointer">
              <i className="fas fa-comments">
                <Favorite width="90%" height="90%" />
              </i>
            </div>
          </li>
          <li >
            <span onClick={() => navigate('/')} className="fab-label w-20 text-center cursor-pointer">홈</span>
            <div onClick={() => navigate('/')} className="fab-icon-holder cursor-pointer">
              <i className="">
                <Home width="70%" height="70%" />
              </i>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default FabButton;
