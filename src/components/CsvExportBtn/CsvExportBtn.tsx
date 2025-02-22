import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';

const CsvExportBtn = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const data = useSelector((state: RootState) => state.cardStore.characters);
  const downloadCSV = () => {
    const csvString = [
      ['Name', 'Gender', 'BirthDate'],
      ...data.map((item) => [item.name, item.gender, item.birth_year]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });

    setDownloadUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    if (downloadUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [downloadUrl]);

  return (
    <div>
      <button onClick={downloadCSV}>Download</button>
      <a
        ref={linkRef}
        href={downloadUrl}
        download="download.csv"
        style={{ display: 'none' }}
      ></a>
    </div>
  );
};

export default CsvExportBtn;
