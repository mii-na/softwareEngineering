import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';


// --- データ型定義 (Homeと合わせる) ---
// Home.tsxのParcelDataと同じ構造にします
interface ParcelDataCommon {
  id: string;
  studentId?: string;
  studentName: string;
  type: '荷物' | '郵便';
  count: number;
  deliveryDate: string;
  elapsedDays: number;
}

// --- アイコン ---
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
  
  const [items, setItems] = useState<ParcelDataCommon[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ParcelDataCommon | null>(null);

  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // --- 初回読み込み ---
  useEffect(() => {
    const savedData = localStorage.getItem('parcelData');
    if (savedData) {
      setItems(JSON.parse(savedData));
    } else {
      // Homeで初期化されているはずだが念のため
      setItems([]); 
    }
  }, []);

  // --- データを保存する関数 ---
  const saveItems = (newItems: ParcelDataCommon[]) => {
    setItems(newItems);
    localStorage.setItem('parcelData', JSON.stringify(newItems));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('削除しますか？')) {
      const newItems = items.filter((item) => item.id !== id);
      saveItems(newItems); // 保存
    }
  };

  const handleEditClick = (item: ParcelDataCommon) => {
    setEditingItem({ ...item });
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    const newItem: ParcelDataCommon = {
      id: '', 
      studentId: '',
      studentName: '',
      type: '荷物',
      count: 1, // デフォルト個数
      deliveryDate: getTodayDate(),
      elapsedDays: 0
    };
    setEditingItem(newItem);
    setIsModalOpen(true);
  };

  const handleInputChange = (field: keyof ParcelDataCommon, value: string | number) => {
    if (editingItem) {
      setEditingItem({ ...editingItem, [field]: value });
    }
  };

  const handleSave = () => {
    if (!editingItem) return;

    let newItems = [...items];

    if (editingItem.id === '') {
      // 新規追加
      const newId = Date.now().toString();
      const newItem = { ...editingItem, id: newId };
      newItems.push(newItem);
    } else {
      // 更新
      newItems = newItems.map((item) => 
        item.id === editingItem.id ? editingItem : item
      );
    }
    
    saveItems(newItems); // 保存して反映
    setIsModalOpen(false);
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
                <th className="th-icon-header"></th>
                <th className="th-icon-header"></th>
                <th className="th-name">学生名</th>
                <th className="th-type">種類</th>
                <th className="th-date">配達日</th>
                <th className="th-days">経過日数</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="td-icon">
                    <div className="icon-box" onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }}>
                      <TrashIcon />
                    </div>
                  </td>
                  <td className="td-icon">
                    <div className="icon-box" onClick={() => handleEditClick(item)} style={{ cursor: 'pointer' }}>
                      <EditIcon />
                    </div>
                  </td>
                  <td className="td-name">{item.studentName}</td>
                  <td className="td-center">{item.type}</td>
                  <td className="td-center">{item.deliveryDate}</td>
                  <td className="td-center">{item.elapsedDays}</td>
                </tr>
              ))}
              <tr className="empty-row">
                 <td className="td-icon-empty"></td><td className="td-icon-empty"></td>
                 <td></td><td></td><td></td><td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="button-row">
          <button className="action-button" onClick={handleAddClick}>
            追加
          </button>
          
          <button className="action-button" onClick={() => navigate('/')}>
            戻り
          </button>
        </div>

      </main>

      {/* --- モーダル --- */}
      {isModalOpen && editingItem && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              {editingItem.id === '' ? '荷物登録' : '荷物登録'}
            </h2>
            
            <div className="form-group">
              <label className="form-label">学籍番号</label>
              <input 
                type="text" 
                className="form-input"
                value={editingItem.studentId || ''}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                placeholder="例: 2025005"
              />
            </div>

            <div className="form-group">
              <label className="form-label">学生名</label>
              <input 
                type="text" 
                className="form-input"
                value={editingItem.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="例: 学生E"
              />
            </div>

            <div className="form-group">
              <label className="form-label">種類</label>
              <select 
                className="form-select"
                value={editingItem.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
              >
                <option value="荷物">荷物</option>
                <option value="郵便">郵便</option>
              </select>
            </div>
            
            {/* 個数編集が必要な場合はここに追加できますが、今回は指定がなかったため省略 */}

            <div className="form-group">
              <label className="form-label">配達日</label>
              <input 
                type="date"
                className="form-input"
                value={editingItem.deliveryDate}
                onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
              />
            </div>

            <div className="modal-actions">
              <button className="save-button" onClick={handleSave}>
                登録
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;