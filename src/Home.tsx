import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

// --- データ型定義 ---
export interface ParcelData {
  id: string;
  studentId?: string;
  studentName: string;
  type: '荷物' | '郵便';
  count: number;
  deliveryDate: string;
  elapsedDays: number;
  isReceived: boolean;
}

// --- 初期データ ---
export const mockData: ParcelData[] = [
  { id: '1', studentId: '2025001', studentName: '学生A', type: '荷物', count: 1, deliveryDate: '2025-12-15', elapsedDays: 7, isReceived: false },
  { id: '2', studentId: '2025002', studentName: '学生B', type: '荷物', count: 1, deliveryDate: '2025-12-20', elapsedDays: 2, isReceived: false },
  { id: '3', studentId: '2025003', studentName: '学生C', type: '荷物', count: 2, deliveryDate: '2025-12-22', elapsedDays: 0, isReceived: false },
  { id: '4', studentId: '2025004', studentName: '学生Δ', type: '郵便', count: 1, deliveryDate: '2025-12-22', elapsedDays: 0, isReceived: false },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState<ParcelData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ParcelData | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('parcelData');
    if (savedData) {
      setItems(JSON.parse(savedData));
    } else {
      setItems(mockData);
      localStorage.setItem('parcelData', JSON.stringify(mockData));
    }
  }, []);

  const handleRowDoubleClick = (item: ParcelData) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">寮生宅配物受領システム</div>
        <div className="header-menu">
          <span className="header-link">履歴</span>
          <span className="header-link">メッセージ</span>
        </div>
      </header>

      <main className="main-content">
        <h1 className="page-title">未受領者</h1>

        <div className="table-container">
          <table className="parcel-table">
            <thead>
              <tr>
                <th className="th-name">学生名</th>
                <th className="th-type">種類</th>
                <th className="th-date">配達日</th>
                <th className="th-days">経過日数</th>
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => !item.isReceived)
                .map((item) => (
                  <tr 
                    key={item.id} 
                    onDoubleClick={() => handleRowDoubleClick(item)}
                    className="clickable-row"
                  >
                    <td className="td-name">{item.studentName}</td>
                    <td className="td-center">{item.type}</td>
                    <td className="td-center">{item.deliveryDate}</td>
                    <td className="td-center">{item.elapsedDays}</td>
                  </tr>
              ))}
              <tr className="empty-row">
                 <td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-container">
          <button className="action-button" onClick={() => navigate('/edit')}>
            編集
          </button>
        </div>
      </main>

      {/* 詳細モーダル */}
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="detail-title">{selectedItem.studentName}</h2>
            <div className="detail-info">
              <p>種類 : {selectedItem.type}</p>
              <p>個数 : {selectedItem.count}</p>
              <p>配達日 : {selectedItem.deliveryDate}</p>
            </div>
            <div className="modal-actions">
              {/* ▼ここを変更しました */}
              <button className="save-button" onClick={() => setIsModalOpen(false)}>
                戻る
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;