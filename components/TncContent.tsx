// TnC content rendered inside the scrollable gate.
// Structured as a static constant — bilingual (id / en).
// Each section can have: title, paragraphs, bullets, sub-sections.

type TncItem =
  | { type: "paragraph"; text: string }
  | { type: "bullet"; items: string[] }
  | { type: "sub"; number: string; title: string; body: (TncItem)[] };

type TncSection = {
  number: string;
  title: string;
  body: TncItem[];
};

const TNC_ID: TncSection[] = [
  {
    number: "1",
    title: "DEFINISI",
    body: [
      { type: "bullet", items: [
        "IBLM adalah IBLM Law Group.",
        "Client Relation (CR) adalah perwakilan resmi IBLM yang dapat dihubungi melalui cr@iblmlaw.group.",
        "Lawyer adalah konsultan hukum yang ditunjuk oleh IBLM untuk memberikan layanan konsultasi.",
        "Client (Klien) adalah pihak yang telah melakukan pembayaran dan menyetujui seluruh ketentuan dalam dokumen ini.",
        "Terms & Conditions adalah seluruh syarat dan ketentuan yang mengatur penggunaan layanan konsultasi hukum daring IBLM.",
      ]},
    ],
  },
  {
    number: "2",
    title: "PROSEDUR BOOKING & PEMBAYARAN",
    body: [
      { type: "sub", number: "2.1", title: "Permohonan Konsultasi", body: [
        { type: "paragraph", text: "Klien wajib menyampaikan ringkasan permasalahan hukum atau kebutuhan jasa hukum melalui:" },
        { type: "bullet", items: [
          "Direct Message media sosial IBLM; atau",
          "Email kepada CR di cr@iblmlaw.group.",
        ]},
      ]},
      { type: "sub", number: "2.2", title: "Konfirmasi Jadwal & Biaya", body: [
        { type: "paragraph", text: "IBLM melalui Admin/CR akan:" },
        { type: "bullet", items: [
          "Memastikan ketersediaan waktu,",
          "Mengidentifikasi kebutuhan hukum Klien,",
          "Memberikan estimasi biaya jasa.",
        ]},
      ]},
      { type: "sub", number: "2.3", title: "Konfirmasi Booking", body: [
        { type: "paragraph", text: "Klien wajib mengonfirmasi jadwal kepada Admin/CR." },
      ]},
      { type: "sub", number: "2.4", title: "Permintaan Pembayaran", body: [
        { type: "paragraph", text: "Setelah jadwal dikonfirmasi, Klien akan menerima permintaan pembayaran melalui email dan/atau WhatsApp." },
      ]},
      { type: "sub", number: "2.5", title: "Batas Waktu Pembayaran", body: [
        { type: "paragraph", text: "Pembayaran wajib dilakukan dalam waktu 1 x 24 jam sejak permintaan pembayaran dikirimkan." },
      ]},
      { type: "sub", number: "2.6", title: "Konfirmasi & Dokumen", body: [
        { type: "paragraph", text: "Setelah pembayaran diterima, Klien akan menerima:" },
        { type: "bullet", items: [
          "Konfirmasi pembayaran,",
          "Nama Lawyer yang ditunjuk,",
          "Formulir penggunaan jasa,",
          "Tautan konsultasi sesuai jadwal.",
        ]},
      ]},
      { type: "sub", number: "2.7", title: "Status Klien", body: [
        { type: "paragraph", text: "Dengan melakukan pembayaran, pengguna secara otomatis menjadi Klien, dan dianggap telah membaca, memahami, menyetujui, dan terikat secara hukum pada seluruh Terms & Conditions ini." },
      ]},
    ],
  },
  {
    number: "3",
    title: "PERSIAPAN PRA-KONSULTASI",
    body: [
      { type: "sub", number: "3.1", title: "Pengiriman Dokumen Awal", body: [
        { type: "paragraph", text: "Klien disarankan mengirimkan ke cr@iblmlaw.group sebelum sesi berlangsung:" },
        { type: "bullet", items: [
          "Ringkasan kronologi,",
          "Dokumen/bukti pendukung (digital),",
          "Maksimal 3 (tiga) pertanyaan awal.",
        ]},
      ]},
      { type: "sub", number: "3.2", title: "Privasi & Lokasi", body: [
        { type: "paragraph", text: "Klien wajib berada di tempat yang privat, aman, tenang, dan minim gangguan." },
      ]},
      { type: "sub", number: "3.3", title: "Kesiapan Teknis", body: [
        { type: "paragraph", text: "Klien wajib bersiap 15 menit sebelum jadwal untuk memastikan koneksi internet stabil." },
      ]},
      { type: "sub", number: "3.4", title: "Potensi Keterlambatan", body: [
        { type: "paragraph", text: "IBLM menyarankan Klien menyediakan waktu tambahan 15–30 menit untuk mengantisipasi keterlambatan sesi sebelumnya." },
      ]},
    ],
  },
  {
    number: "4",
    title: "KEBIJAKAN SESI KONSULTASI",
    body: [
      { type: "sub", number: "4.1", title: "Durasi", body: [
        { type: "paragraph", text: "Sesi konsultasi berlangsung selama 60 menit sejak waktu yang telah dijadwalkan." },
      ]},
      { type: "sub", number: "4.2", title: "Kelebihan Waktu", body: [
        { type: "paragraph", text: "Kelebihan waktu akan dikenakan biaya tambahan sebesar Rp250.000,00 per 30 menit." },
      ]},
      { type: "sub", number: "4.3", title: "Perubahan Jadwal oleh Klien", body: [
        { type: "paragraph", text: "Harus diberitahukan paling lambat 1 x 24 jam sebelumnya. Perubahan kurang dari batas waktu tersebut dikenakan biaya administrasi Rp200.000,00." },
      ]},
      { type: "sub", number: "4.4", title: "Perubahan oleh IBLM", body: [
        { type: "paragraph", text: "Jika Lawyer berhalangan hadir, IBLM akan memberitahukan maksimal 1 x 24 jam sebelumnya. Klien dapat memilih: mengubah jadwal atau mengganti Lawyer." },
      ]},
      { type: "sub", number: "4.5", title: "Keterlambatan Klien", body: [
        { type: "paragraph", text: "Toleransi maksimal 5 menit tanpa pengurangan waktu. Keterlambatan lebih dari 5 menit akan mengurangi durasi sesi." },
      ]},
      { type: "sub", number: "4.6", title: "Keterlambatan Lawyer", body: [
        { type: "paragraph", text: "Jika keterlambatan disebabkan oleh klien sebelumnya, Lawyer, atau gangguan teknis dari IBLM, maka waktu konsultasi tetap dihitung penuh 60 menit, dimulai 5 menit setelah pemberitahuan kesiapan Lawyer." },
      ]},
      { type: "sub", number: "4.7", title: "Ketidakhadiran Klien", body: [
        { type: "paragraph", text: "Jika Klien tidak hadir lebih dari 30 menit tanpa kabar, Lawyer berhak mengakhiri sesi. Jika tetap dilanjutkan, waktu tetap dihitung dari jadwal awal." },
      ]},
      { type: "sub", number: "4.8", title: "No Refund Policy", body: [
        { type: "paragraph", text: "Ketidakhadiran Klien sepenuhnya menjadi tanggung jawab Klien. Tidak tersedia pengembalian biaya (full maupun partial). Jika Lawyer tidak dapat hadir, Klien hanya dapat menjadwal ulang atau mengganti Lawyer." },
      ]},
    ],
  },
  {
    number: "5",
    title: "KERAHASIAAN",
    body: [
      { type: "sub", number: "5.1", title: "Kerahasiaan Informasi", body: [
        { type: "paragraph", text: "Seluruh percakapan, dokumen, dan informasi yang diberikan sebelum dan selama konsultasi bersifat rahasia dan dilindungi kode etik profesi." },
      ]},
      { type: "sub", number: "5.2", title: "Larangan Rekaman", body: [
        { type: "paragraph", text: "Klien dilarang merekam, mengambil gambar, menyebarkan, atau mengungkapkan isi konsultasi tanpa persetujuan tertulis dari Partner atau Lawyer IBLM." },
      ]},
      { type: "sub", number: "5.3", title: "Pengecualian", body: [
        { type: "paragraph", text: "Kerahasiaan hanya dapat dibuka untuk kepentingan pemeriksaan peradilan sesuai hukum yang berlaku." },
      ]},
    ],
  },
  {
    number: "6",
    title: "RUANG LINGKUP KONSULTASI",
    body: [
      { type: "sub", number: "6.1", title: "Batasan Topik", body: [
        { type: "paragraph", text: "Lawyer hanya akan membahas permasalahan yang telah disampaikan saat booking, kecuali disepakati lain." },
      ]},
      { type: "sub", number: "6.2", title: "Pertanyaan Sensitif", body: [
        { type: "paragraph", text: "Klien memahami bahwa Lawyer dapat menanyakan hal yang bersifat sensitif atau pribadi untuk kepentingan analisis hukum." },
      ]},
      { type: "sub", number: "6.3", title: "Jasa Tambahan", body: [
        { type: "paragraph", text: "Jika terdapat jasa tambahan, hal tersebut harus dikonfirmasi tertulis, disertai permintaan pembayaran, dan akan didokumentasikan." },
      ]},
    ],
  },
  {
    number: "7",
    title: "RINGKASAN KONSULTASI",
    body: [
      { type: "sub", number: "7.1", title: "Ringkasan Konsultasi", body: [
        { type: "paragraph", text: "Klien berhak menerima Ringkasan Konsultasi maksimal 7 x 24 jam setelah sesi." },
      ]},
      { type: "sub", number: "7.2", title: "Isi Ringkasan", body: [
        { type: "paragraph", text: "Ringkasan maksimal 2 halaman, berisi jawaban dalam format sederhana, dan dapat mencakup jawaban atas pertanyaan yang belum terjawab saat sesi." },
      ]},
      { type: "sub", number: "7.3", title: "Penyesuaian Jawaban", body: [
        { type: "paragraph", text: "Jawaban dalam Ringkasan dapat berbeda dari sesi lisan apabila terdapat riset tambahan, analisis lanjutan, atau pemeriksaan hukum lebih mendalam." },
      ]},
    ],
  },
  {
    number: "8",
    title: "PENAFIAN",
    body: [
      { type: "sub", number: "8.1", title: "Bukan Legal Opinion", body: [
        { type: "paragraph", text: "Jawaban dalam sesi konsultasi berdasarkan informasi terbatas, bergantung pada data yang diberikan Klien, dan dapat berubah jika terdapat informasi baru. Jawaban tersebut bukan merupakan legal opinion formal." },
      ]},
      { type: "sub", number: "8.2", title: "Bukan Penyelesaian Akhir", body: [
        { type: "paragraph", text: "Sesi konsultasi memberikan pemahaman dan rekomendasi, dan tidak selalu merupakan solusi final atas permasalahan hukum." },
      ]},
      { type: "sub", number: "8.3", title: "Layanan Lanjutan", body: [
        { type: "paragraph", text: "Untuk penyelesaian lebih lanjut, Klien dapat menggunakan layanan hukum tambahan sesuai kebutuhan." },
      ]},
    ],
  },
  {
    number: "9",
    title: "PEMBERITAHUAN KERAHASIAAN",
    body: [
      { type: "paragraph", text: "Dokumen ini hanya diperuntukkan bagi pihak yang berkepentingan. Setiap pihak yang membaca atau menerima dokumen ini tanpa hak tetap terikat pada kewajiban kerahasiaan serta menanggung risiko dan konsekuensi hukum yang berlaku." },
    ],
  },
];

const TNC_EN: TncSection[] = [
  {
    number: "1",
    title: "DEFINITIONS",
    body: [
      { type: "bullet", items: [
        "IBLM refers to IBLM Law Group.",
        "Client Relation (CR) is the official IBLM representative reachable at cr@iblmlaw.group.",
        "Lawyer is the legal consultant appointed by IBLM to provide consultation services.",
        "Client is the party who has completed payment and agreed to all provisions in this document.",
        "Terms & Conditions refers to all terms and conditions governing the use of IBLM's online legal consultation services.",
      ]},
    ],
  },
  {
    number: "2",
    title: "BOOKING & PAYMENT PROCEDURE",
    body: [
      { type: "sub", number: "2.1", title: "Consultation Request", body: [
        { type: "paragraph", text: "The Client must submit a summary of their legal issue or legal service needs through:" },
        { type: "bullet", items: [
          "Direct Message via IBLM's social media; or",
          "Email to CR at cr@iblmlaw.group.",
        ]},
      ]},
      { type: "sub", number: "2.2", title: "Schedule & Fee Confirmation", body: [
        { type: "paragraph", text: "IBLM through Admin/CR will:" },
        { type: "bullet", items: [
          "Confirm availability,",
          "Identify the Client's legal needs,",
          "Provide a service fee estimate.",
        ]},
      ]},
      { type: "sub", number: "2.3", title: "Booking Confirmation", body: [
        { type: "paragraph", text: "The Client must confirm the schedule with Admin/CR." },
      ]},
      { type: "sub", number: "2.4", title: "Payment Request", body: [
        { type: "paragraph", text: "After the schedule is confirmed, the Client will receive a payment request via email and/or WhatsApp." },
      ]},
      { type: "sub", number: "2.5", title: "Payment Deadline", body: [
        { type: "paragraph", text: "Payment must be completed within 1 x 24 hours from when the payment request is sent." },
      ]},
      { type: "sub", number: "2.6", title: "Confirmation & Documents", body: [
        { type: "paragraph", text: "Upon receipt of payment, the Client will receive:" },
        { type: "bullet", items: [
          "Payment confirmation,",
          "Name of the assigned Lawyer,",
          "Service agreement form,",
          "Consultation link as per schedule.",
        ]},
      ]},
      { type: "sub", number: "2.7", title: "Client Status", body: [
        { type: "paragraph", text: "By completing payment, the user automatically becomes a Client and is deemed to have read, understood, agreed to, and is legally bound by all of these Terms & Conditions." },
      ]},
    ],
  },
  {
    number: "3",
    title: "PRE-CONSULTATION PREPARATION",
    body: [
      { type: "sub", number: "3.1", title: "Initial Document Submission", body: [
        { type: "paragraph", text: "The Client is advised to send the following to cr@iblmlaw.group before the session:" },
        { type: "bullet", items: [
          "A chronological summary,",
          "Supporting documents/evidence (digital),",
          "A maximum of 3 (three) initial questions.",
        ]},
      ]},
      { type: "sub", number: "3.2", title: "Privacy & Location", body: [
        { type: "paragraph", text: "The Client must be in a private, safe, quiet, and distraction-free location." },
      ]},
      { type: "sub", number: "3.3", title: "Technical Readiness", body: [
        { type: "paragraph", text: "The Client must be ready 15 minutes before the scheduled time to ensure a stable internet connection." },
      ]},
      { type: "sub", number: "3.4", title: "Potential Delays", body: [
        { type: "paragraph", text: "IBLM advises the Client to allow an additional 15–30 minutes to accommodate potential delays from preceding sessions." },
      ]},
    ],
  },
  {
    number: "4",
    title: "CONSULTATION SESSION POLICY",
    body: [
      { type: "sub", number: "4.1", title: "Duration", body: [
        { type: "paragraph", text: "The consultation session lasts 60 minutes from the scheduled start time." },
      ]},
      { type: "sub", number: "4.2", title: "Overtime", body: [
        { type: "paragraph", text: "Overtime will incur an additional charge of IDR 250,000 per 30 minutes." },
      ]},
      { type: "sub", number: "4.3", title: "Schedule Changes by Client", body: [
        { type: "paragraph", text: "Must be communicated at least 1 x 24 hours in advance. Changes within this period incur an administrative fee of IDR 200,000." },
      ]},
      { type: "sub", number: "4.4", title: "Changes by IBLM", body: [
        { type: "paragraph", text: "If the Lawyer is unavailable, IBLM will notify at most 1 x 24 hours in advance. The Client may choose to reschedule or request a different Lawyer." },
      ]},
      { type: "sub", number: "4.5", title: "Client Tardiness", body: [
        { type: "paragraph", text: "A maximum grace period of 5 minutes applies with no time deduction. Tardiness beyond 5 minutes will reduce the session duration." },
      ]},
      { type: "sub", number: "4.6", title: "Lawyer Tardiness", body: [
        { type: "paragraph", text: "If tardiness is caused by the preceding client, the Lawyer, or technical issues from IBLM, the full 60-minute consultation will be maintained, starting 5 minutes after notification of Lawyer readiness." },
      ]},
      { type: "sub", number: "4.7", title: "Client No-Show", body: [
        { type: "paragraph", text: "If the Client does not attend for more than 30 minutes without notice, the Lawyer may end the session. If continued, time is still counted from the original schedule." },
      ]},
      { type: "sub", number: "4.8", title: "No Refund Policy", body: [
        { type: "paragraph", text: "Client no-shows are entirely the Client's responsibility. No refunds (full or partial) are available. If the Lawyer is unable to attend, the Client may only reschedule or request a different Lawyer." },
      ]},
    ],
  },
  {
    number: "5",
    title: "CONFIDENTIALITY",
    body: [
      { type: "sub", number: "5.1", title: "Information Confidentiality", body: [
        { type: "paragraph", text: "All conversations, documents, and information provided before and during the consultation are confidential and protected under the professional code of ethics." },
      ]},
      { type: "sub", number: "5.2", title: "Recording Prohibition", body: [
        { type: "paragraph", text: "The Client is prohibited from recording, screenshotting, distributing, or disclosing consultation content without written consent from an IBLM Partner or Lawyer." },
      ]},
      { type: "sub", number: "5.3", title: "Exceptions", body: [
        { type: "paragraph", text: "Confidentiality may only be waived for judicial proceedings in accordance with applicable law." },
      ]},
    ],
  },
  {
    number: "6",
    title: "SCOPE OF CONSULTATION",
    body: [
      { type: "sub", number: "6.1", title: "Topic Limitations", body: [
        { type: "paragraph", text: "The Lawyer will only discuss issues submitted at the time of booking, unless otherwise agreed." },
      ]},
      { type: "sub", number: "6.2", title: "Sensitive Questions", body: [
        { type: "paragraph", text: "The Client acknowledges that the Lawyer may ask sensitive or personal questions for the purpose of legal analysis." },
      ]},
      { type: "sub", number: "6.3", title: "Additional Services", body: [
        { type: "paragraph", text: "Any additional services must be confirmed in writing, accompanied by a payment request, and will be documented accordingly." },
      ]},
    ],
  },
  {
    number: "7",
    title: "CONSULTATION SUMMARY",
    body: [
      { type: "sub", number: "7.1", title: "Summary Document", body: [
        { type: "paragraph", text: "The Client is entitled to receive a Consultation Summary within a maximum of 7 x 24 hours after the session." },
      ]},
      { type: "sub", number: "7.2", title: "Summary Contents", body: [
        { type: "paragraph", text: "The summary is a maximum of 2 pages, presented in simplified format, and may include answers to questions not fully addressed during the session." },
      ]},
      { type: "sub", number: "7.3", title: "Answer Adjustments", body: [
        { type: "paragraph", text: "Answers in the Summary may differ from verbal responses if additional research, analysis, or deeper legal review was conducted." },
      ]},
    ],
  },
  {
    number: "8",
    title: "DISCLAIMER",
    body: [
      { type: "sub", number: "8.1", title: "Not a Legal Opinion", body: [
        { type: "paragraph", text: "Answers provided during the session are based on limited information, dependent on data provided by the Client, and may change if new information arises. These answers do not constitute a formal legal opinion." },
      ]},
      { type: "sub", number: "8.2", title: "Not a Final Resolution", body: [
        { type: "paragraph", text: "The consultation session provides understanding and recommendations, and does not necessarily constitute a final solution to the legal issue." },
      ]},
      { type: "sub", number: "8.3", title: "Further Services", body: [
        { type: "paragraph", text: "For further resolution, the Client may engage additional legal services as needed." },
      ]},
    ],
  },
  {
    number: "9",
    title: "CONFIDENTIALITY NOTICE",
    body: [
      { type: "paragraph", text: "This document is intended solely for authorized parties. Any party who reads or receives this document without authorization remains bound by confidentiality obligations and bears applicable legal risks and consequences." },
    ],
  },
];

// ─── Renderer ─────────────────────────────────────────────────────────────────

function renderBody(items: TncItem[]): React.ReactNode {
  return items.map((item, i) => {
    if (item.type === "paragraph") {
      return (
        <p key={i} className="text-[#2E4472] text-sm font-light leading-relaxed mb-2 last:mb-0">
          {item.text}
        </p>
      );
    }
    if (item.type === "bullet") {
      return (
        <ul key={i} className="space-y-1 mb-2">
          {item.items.map((bullet, j) => (
            <li key={j} className="flex items-start gap-2.5 text-[#2E4472] text-sm font-light">
              <span className="mt-[7px] w-1.5 h-1.5 bg-[#D4C5A0] rounded-full shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (item.type === "sub") {
      return (
        <div key={i} className="mb-4 last:mb-0">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="text-[10px] font-bold text-[#0B1B3B] bg-[#0B1B3B]/8 px-2 py-0.5 shrink-0">
              {item.number}
            </span>
            <span className="text-xs font-bold text-[#0B1B3B] uppercase tracking-wider">
              {item.title}
            </span>
          </div>
          <div className="pl-4 border-l border-[#0B1B3B]/10">
            {renderBody(item.body)}
          </div>
        </div>
      );
    }
    return null;
  });
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function TncContent({ locale }: { locale: string }) {
  const sections = locale === "id" ? TNC_ID : TNC_EN;

  return (
    <div className="space-y-6">
      {/* Document header */}
      <div className="pb-4 border-b-2 border-[#0B1B3B]/10">
        <p className="text-[10px] font-bold text-[#0B1B3B] uppercase tracking-[0.2em]">
          {locale === "id"
            ? "SYARAT & KETENTUAN — LAYANAN KONSULTASI HUKUM DARING"
            : "TERMS & CONDITIONS — ONLINE LEGAL CONSULTATION SERVICES"}
        </p>
        <p className="text-[10px] text-[#2E4472]/60 mt-1 tracking-wide">IBLM Law Group</p>
      </div>

      {sections.map((section) => (
        <div key={section.number}>
          {/* Section heading */}
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center justify-center w-7 h-7 bg-[#0B1B3B] text-[#D4C5A0] text-[11px] font-bold shrink-0">
              {section.number}
            </span>
            <h4 className="text-xs font-bold text-[#0B1B3B] uppercase tracking-[0.15em]">
              {section.title}
            </h4>
          </div>

          <div className="pl-10">
            {renderBody(section.body)}
          </div>
        </div>
      ))}
    </div>
  );
}
