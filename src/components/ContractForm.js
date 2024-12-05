import React, { useState } from "react";
import axios from "axios";

const ContractForm = () => {
  const [otr, setOtr] = useState("");
  const [dp, setDp] = useState("");
  const [duration, setDuration] = useState("");
  const [kontrakNo, setKontrakNo] = useState("");
  const [clientName, setClientName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [result, setResult] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [searchKontrakNo, setSearchKontrakNo] = useState("");
  const [searchClientName, setSearchClientName] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractData = {
      otr,
      dp,
      duration,
      kontrakNo,
      clientName,
      startDate,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/contracts/create",
        contractData
      );
      setResult(data);
      fetchSchedule(kontrakNo); // Ambil jadwal angsuran setelah kontrak dibuat
    } catch (err) {
      console.error("Error creating contract:", err);
    }
  };

  const fetchSchedule = async (kontrakNo) => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/contracts/schedule/${kontrakNo}`
      );
      setSchedule(data);
    } catch (err) {
      console.error("Error fetching schedule:", err);
    }
  };

  const handleSearch = async () => {
    // Validasi panjang input sebelum pencarian
    if (searchKontrakNo.length < 2 && searchClientName.length < 2) {
      alert("Harap masukkan lebih dari 1 karakter untuk pencarian");
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/contracts/search",
        {
          params: {
            kontrakNo: searchKontrakNo,
            clientName: searchClientName,
          },
        }
      );
      setSearchResult(data);
    } catch (err) {
      console.error("Error searching contract:", err);
      setSearchResult(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nomor Kontrak"
          value={kontrakNo}
          onChange={(e) => setKontrakNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nama Klien"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Harga Mobil (OTR)"
          value={otr}
          onChange={(e) => setOtr(e.target.value)}
        />
        <input
          type="number"
          placeholder="DP (%)"
          value={dp}
          onChange={(e) => setDp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Durasi Cicilan (Bulan)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="date"
          placeholder="Tanggal Mulai"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button type="submit">Buat Kontrak</button>
      </form>

      {result && (
        <div>
          <p>
            <strong>DP:</strong> {result.dpAmount}
          </p>
          <p>
            <strong>Total Pinjaman dengan Bunga:</strong>{" "}
            {result.totalLoanWithInterest}
          </p>
          <p>
            <strong>Bunga Diterapkan:</strong> {result.interestRate}%
          </p>{" "}
          {/* Menampilkan bunga sebagai 16.5% */}
          <p>
            <strong>Angsuran per Bulan:</strong> {result.monthlyInstallment}
          </p>
        </div>
      )}

      <div>
        <h3>Pencarian Kontrak</h3>
        <input
          type="text"
          placeholder="Cari berdasarkan Nomor Kontrak"
          value={searchKontrakNo}
          onChange={(e) => setSearchKontrakNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Cari berdasarkan Nama Klien"
          value={searchClientName}
          onChange={(e) => setSearchClientName(e.target.value)}
        />
        <button onClick={handleSearch}>Cari</button>
      </div>

      {searchResult && (
        <div>
          <h3>Hasil Pencarian</h3>
          <p>
            <strong>Nomor Kontrak:</strong> {searchResult.kontrak.KONTRAK_NO}
          </p>
          <p>
            <strong>Nama Klien:</strong> {searchResult.kontrak.CLIENT_NAME}
          </p>
          <table>
            <thead>
              <tr>
                <th>Angsuran Ke</th>
                <th>Jumlah</th>
                <th>Tanggal Jatuh Tempo</th>
              </tr>
            </thead>
            <tbody>
              {searchResult.schedule.map((item, index) => {
                // Memastikan format tanggal yang ditampilkan adalah YYYY-MM-DD
                const formattedDate = new Date(item.TANGGAL_JATUH_TEMPO)
                  .toISOString()
                  .split("T")[0];

                return (
                  <tr key={index}>
                    <td>{item.ANGSURAN_KE}</td>
                    <td>{item.ANGSURAN_PER_BULAN}</td>
                    <td>{formattedDate}</td>{" "}
                    {/* Tampilkan tanggal yang telah diformat */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContractForm;
