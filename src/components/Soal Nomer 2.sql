--untuk case database sesuai tabel di soal
SELECT
    'AGR00001' AS "KONTRAK NO",
    'SUGUS' AS "CLIENT NAME",
    SUM(ANGSURAN_PER_BULAN) AS "TOTAL ANGSURAN JATUH TEMPO"
FROM
    JADWAL_ANGSURAN
WHERE
    KONTRAK_NO = 'AGR00001'
    AND TANGGAL_JATUH_TEMPO <= '2024-08-14';


