import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IrishRailStation, IrishRailStationJourney } from '../../../../api/irish-rail/irish-rail.model';

@Component({
  selector: 'journey-list',
  templateUrl: './journey-list.component.html',
  styleUrls: ['./journey-list.component.scss']
})

export class JourneyListComponent {
  @Input() selectedStation: IrishRailStation;
  @Input() journeysList: IrishRailStationJourney[];
  @Output() refreshJourneys = new EventEmitter<IrishRailStation>();

  public displayedColumns: string[] = ['destination', 'origin', 'scheduled', 'late', 'expected'];

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
}
