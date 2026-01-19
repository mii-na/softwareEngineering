import React from 'react';
import { useNavigate } from 'react-router-dom'; // 画面遷移用フック
import './App.css';

// データ型の定義
export interface ParcelData {
  id: string;
  studentName: string;
  type: '荷物' | '郵便';
  deliveryDate: string;
  elapsedDays: number;
}

// モックデータ（実運用ではAPIなどから取得）
export const mockData: ParcelData[] = [
  { id: '1', studentName: '学生A', type: '荷物', deliveryDate: '2025/12/15', elapsedDays: 7 },
  { id: '2', studentName: '学生B', type: '荷物', deliveryDate: '2025/12/20', elapsedDays: 2 },
  { id: '3', studentName: '学生C', type: '荷物', deliveryDate: '2025/12/22', elapsedDays: 0 },
  { id: '4', studentName: '学生Δ', type: '郵便', deliveryDate: '2025/12/22', elapsedDays: 0 },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-title">寮生宅配物受領システム</div>
        <div className="header-history">履歴</div>
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
              {mockData.map((item) => (
                <tr key={item.id}>
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
          {/* クリックしたら /edit へ遷移 */}
          <button className="action-button" onClick={() => navigate('/edit')}>
            編集
          </button>
        </div>
      </main>
    </div>
  );
};

export default Home;