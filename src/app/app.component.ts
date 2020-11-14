import { Component } from '@angular/core';
import { Summary } from './summary.model';
import { SummaryService } from './summary.service';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  summary: Summary[];

  rowGroupMetadata: any;
  summaryTableColumns = [
    {
      field: 'region',
      header: 'Region',
    },
    {
      field: 'city',
      header: 'City',
    },
    {
      field: 'hospitals',
      header: 'Total Hospitals',
    },
    {
      field: 'schools',
      header: 'Total Schools',
    },
    {
      field: 'colleges',
      header: 'Total Colleges',
    },
    {
      field: 'companies',
      header: 'Total Companies',
    },
  ];

  constructor(private SummaryService: SummaryService) {}

  /**
   * Hit an API to get summary data
   * call updateRowGroupMetaData to create sub header and grouping
   */
  ngOnInit() {
    this.SummaryService.getCustomersMedium().then((data) => {
      this.summary = data;
      this.updateRowGroupMetaData();
    });
  }

  /**
   * Sorting data
   * @param event
   */
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (data1.region === data2.region && data1.city && data2.city) {
        if (typeof value1 === 'string' && typeof value2 === 'string') {
          result = value1.localeCompare(value2);
        } else {
          result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
        }
      } else if (event.field === 'region') {
        result = value1.localeCompare(value2);
      } else {
        result = 0;
      }
      return event.order * result;
    });
    this.updateRowGroupMetaData();
  }

  /**
   * Updates Rows with Groups
   */
  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.summary) {
      for (let i = 0; i < this.summary.length; i++) {
        let rowData = this.summary[i];

        const totalRowObj = {
          index: 0,
          size: 1,
          hospitals: rowData.hospitals,
          schools: rowData.schools,
          colleges: rowData.colleges,
          companies: rowData.companies,
        };

        if (i == 0) {
          this.rowGroupMetadata[rowData.region] = totalRowObj;
        } else {
          let previousRowData = this.summary[i - 1];
          if (rowData.region === previousRowData.region)
            this.rowGroupMetadata[rowData.region].size++;
          else
            this.rowGroupMetadata[rowData.region] = {
              ...totalRowObj,
              index: i,
            };
        }
      }
    }
    console.log(this.rowGroupMetadata);
  }
}
