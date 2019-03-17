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

  public displayedColumns: string[] = ['destination', 'origin', 'scharrival', 'late', 'exparrival'];

  constructor() { }

  public refresh(station: IrishRailStation): void {
    this.refreshJourneys.emit(station);
  }
}
