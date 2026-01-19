import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { mockData } from './Home'; // データをHomeからインポート（または共通ファイルから）

// アイコンコンポーネント
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E25C5C" width="32px" height="32px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F4C746" width="32px" height="32px">
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
  </svg>
);

const EditPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">寮生宅配物受領システム</div>
        <div className="header-history">履歴</div>
      </header>

      <main className="main-content">
        <h1 className="page-title">未受領者（編集モード）</h1>

        <div className="table-container">
          <table className="parcel-table">
            <thead>
              <tr>
                <th className="th-icon-header"></th>
                <th className="th-icon-header"></th>
                <th className="th-name">学生名</th>
                <th className="th-type">種類</th>
                <th className="th-date">配達日</th>
                <th className="th-days">経過日数</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr key={item.id}>
                  <td className="td-icon"><div className="icon-box"><TrashIcon /></div></td>
                  <td className="td-icon"><div className="icon-box"><EditIcon /></div></td>
                  <td className="td-name">{item.studentName}</td>
                  <td className="td-center">{item.type}</td>
                  <td className="td-center">{item.deliveryDate}</td>
                  <td className="td-center">{item.elapsedDays}</td>
                </tr>
              ))}
              <tr className="empty-row">
                 <td className="td-icon-empty"></td>
                 <td className="td-icon-empty"></td>
                 <td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-container">
          {/* クリックしたらトップページ / へ戻る */}
          <button className="action-button" onClick={() => navigate('/')}>
            戻り
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditPage;