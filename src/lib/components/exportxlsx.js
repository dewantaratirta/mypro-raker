import { browser } from "$app/environment";
import * as XLSX from 'xlsx';

const exportExcel = () => {
    if(!browser) return;

    let x = localStorage?.getItem('winners');
    if(!x){
        return;
    }
    let winners = JSON.parse(x);
    let data = [];
    let header = ['Prize', 'Item', 'Winner'];
    data.push(header);
    
    // Process winners data
    winners.forEach(winner => {
        winner.items.forEach(item => {
            if( !item.hasOwnProperty('winner')
                 || item?.winner?.length === 0) return;
            item.winner.forEach(i => {
                data.push([winner.name, item.name, i.name]);
            });
        });
    });

    // Create workbook and worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Winners");

    // Generate and download file
    XLSX.writeFile(wb, "winners-report.xlsx");
};

export default exportExcel;