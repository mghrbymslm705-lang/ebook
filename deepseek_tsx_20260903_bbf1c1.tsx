'use client';
import { useEffect, useState } from 'react';
import DailyLogForm from '@/components/teacher/DailyLogForm';

export default function DailyLogPage() {
  const [circles, setCircles] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState('');
  const [students, setStudents] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetch('/api/teacher/my-circles')
      .then(res => res.json())
      .then(setCircles);
  }, []);

  useEffect(() => {
    if (selectedCircle) {
      fetch(`/api/teacher/circle-students?circleId=${selectedCircle}`)
        .then(res => res.json())
        .then(setStudents);
    }
  }, [selectedCircle]);

  const handleSave = async (records: any[]) => {
    const res = await fetch('/api/teacher/daily-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ circleId: selectedCircle, date, records }),
    });
    if (res.ok) alert('تم حفظ السجل بنجاح');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">السجل اليومي</h1>
      <div className="mb-4">
        <label>اختر الحلقة:</label>
        <select value={selectedCircle} onChange={(e) => setSelectedCircle(e.target.value)} className="w-full p-2 border rounded">
          <option value="">-- اختر --</option>
          {circles.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="mb-4">
        <label>التاريخ:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded" />
      </div>
      {selectedCircle && <DailyLogForm students={students} onSave={handleSave} />}
    </div>
  );
}