'use client';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

const CsvExportBtn = () => {
  const linkRef = useRef<HTMLAnchorElement | null>(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadName, setDownloadName] = useState('download.csv');
  const data = useSelector((state: RootState) => state.cardStore.characters);
  const downloadCSV = () => {
    const csvString = [
      ['Name', 'Gender', 'BirthDate'],
      ...data.map((item) => [item.name, item.gender, item.birth_year]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    setDownloadName(`${data.length}_starwars_characters.csv`);
    setDownloadUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    if (downloadUrl && linkRef.current) {
      linkRef.current.click();
    }
  }, [downloadUrl]);

  return (
    <>
      <button
        onClick={downloadCSV}
        className="bg-white text-black px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-300"
      >
        Download
      </button>
      <a
        ref={linkRef}
        href={downloadUrl}
        download={downloadName}
        style={{ display: 'none' }}
        data-testid="download-link-test"
      ></a>
    </>
  );
};

export default CsvExportBtn;
