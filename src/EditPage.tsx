import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// --- 方法②：ここで型とデータを定義します ---

interface ParcelData {
  id: string;
  studentName: string;
  type: '荷物' | '郵便';
  deliveryDate: string;
  elapsedDays: number;
}

const mockData: ParcelData[] = [
  { id: '1', studentName: '学生A', type: '荷物', deliveryDate: '2025/12/15', elapsedDays: 7 },
  { id: '2', studentName: '学生B', type: '荷物', deliveryDate: '2025/12/20', elapsedDays: 2 },
  { id: '3', studentName: '学生C', type: '荷物', deliveryDate: '2025/12/22', elapsedDays: 0 },
  { id: '4', studentName: '学生Δ', type: '郵便', deliveryDate: '2025/12/22', elapsedDays: 0 },
];

// --- アイコンの定義 ---

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

// --- メインコンポーネント ---

const EditPage: React.FC = () => {
  const navigate = useNavigate();
  
  // データを状態(items)として管理
  const [items, setItems] = useState<ParcelData[]>(mockData);

  // 削除処理
  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm('削除しますか？');
    if (isConfirmed) {
      // IDが一致しないものだけを残す（＝一致するものを削除）
      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
    }
  };

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
                {/* ヘッダー：アイコン用に空の列を2つ用意 */}
                <th className="th-icon-header"></th>
                <th className="th-icon-header"></th>
                
                <th className="th-name">学生名</th>
                <th className="th-type">種類</th>
                <th className="th-date">配達日</th>
                <th className="th-days">経過日数</th>
              </tr>
            </thead>
            <tbody>
              {/* 重要：mockDataではなくitemsをマップする */}
              {items.map((item) => (
                <tr key={item.id}>
                  
                  {/* 1列目：ゴミ箱アイコン */}
                  <td className="td-icon">
                    <div 
                      className="icon-box" 
                      onClick={() => handleDelete(item.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <TrashIcon />
                    </div>
                  </td>

                  {/* 2列目：編集アイコン（別のtdタグにする） */}
                  <td className="td-icon">
                    <div className="icon-box" style={{ cursor: 'pointer' }}>
                      <EditIcon />
                    </div>
                  </td>

                  {/* データ列 */}
                  <td className="td-name">{item.studentName}</td>
                  <td className="td-center">{item.type}</td>
                  <td className="td-center">{item.deliveryDate}</td>
                  <td className="td-center">{item.elapsedDays}</td>
                </tr>
              ))}
              
              {/* レイアウト調整用の空行 */}
              <tr className="empty-row">
                 <td className="td-icon-empty"></td>
                 <td className="td-icon-empty"></td>
                 <td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-container">
          <button className="action-button" onClick={() => navigate('/')}>
            戻り
          </button>
        </div>
      </main>
    </div>
  );
};

export default EditPage;