import { FileText, Download, FileSpreadsheet, History } from "lucide-react";

export default function ReportsPage() {
  const reports = [
    { id: "REP-092", name: "Monthly Crime Trend - Bengaluru", date: "2026-06-01", type: "PDF", status: "Generated" },
    { id: "REP-091", name: "Gang Activity Analysis", date: "2026-05-28", type: "Excel", status: "Generated" },
    { id: "REP-090", name: "Cybercrime Hotspots Q2", date: "2026-05-15", type: "PDF", status: "Generated" },
    { id: "REP-089", name: "Arrest Records Export", date: "2026-05-10", type: "CSV", status: "Generated" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Intelligence Reports</h1>
        <p className="text-muted-foreground mt-2">Generate and download official intelligence summaries and data exports.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Generator Cards */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">PDF Intelligence Brief</h3>
            <p className="text-sm text-muted-foreground mt-1">Detailed formatted report with charts and maps.</p>
          </div>
          <button className="mt-2 w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Generate PDF
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Excel Data Export</h3>
            <p className="text-sm text-muted-foreground mt-1">Raw dataset with pivot tables for analysis.</p>
          </div>
          <button className="mt-2 w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Generate Excel
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
            <History className="w-8 h-8" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Automated Schedules</h3>
            <p className="text-sm text-muted-foreground mt-1">Configure daily or weekly automated emails.</p>
          </div>
          <button className="mt-2 w-full bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
            Manage Schedules
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-lg">Report History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-6 py-3">Report ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, idx) => (
                <tr key={idx} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                  <td className="px-6 py-4 font-medium">{report.id}</td>
                  <td className="px-6 py-4">{report.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      report.type === 'PDF' ? 'bg-red-500/10 text-red-500' : 
                      report.type === 'Excel' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">{report.date}</td>
                  <td className="px-6 py-4 text-green-500 font-medium">{report.status}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:underline font-medium">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
