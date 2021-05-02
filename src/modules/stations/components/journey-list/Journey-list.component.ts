import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { IrishRailStation, IrishRailStationJourney } from '../../../../api/irish-rail/irish-rail.model';

@Component({
  selector: 'journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss']
})

export class JourneyListComponent implements OnChanges {
  @Input() selectedStation: IrishRailStation;
  @Input() journeysList: IrishRailStationJourney[];
  @Output() refreshJourneys = new EventEmitter<IrishRailStation>();
  public displayedColumns: string[] = ['destination', 'origin', 'scheduled', 'late', 'expected'];
  public journeyByDestination: Record<string, IrishRailStationJourney[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.journeysList) {
      this.journeyByDestination = this.groupByDestination(this.journeysList);
    }
  }

  public refresh(station: IrishRailStation): void {
    this.refreshJourneys.emit(station);
  }

  private isOrigin(row: IrishRailStationJourney): boolean {
    return row.origin === row.stationFullName;
  }

  private isDestination(row: IrishRailStationJourney): boolean {
    return row.destination === row.stationFullName;
  }

  public getExpectedTime(row: IrishRailStationJourney): string {
    return this.isDestination(row) ? row.expectedArrival : row.expectedDeparture;
  }

  public getScheduledTime(row: IrishRailStationJourney): string {
    return this.isDestination(row) ? row.scheduledArrival : row.scheduledDeparture;
  }

  private groupByDestination(journeys: IrishRailStationJourney[]): Record<string, IrishRailStationJourney[]> {
    const key = 'destination';

    return journeys.reduce((prevVal, currVal) => {
      if (!prevVal[currVal[key]]) {
        prevVal[currVal[key]] = [];
      }

      prevVal[currVal[key]].push(currVal);
      return prevVal;
    }, {})
  }
}
