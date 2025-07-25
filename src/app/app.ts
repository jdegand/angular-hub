import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Navigation } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [Navigation],
  template: `<app-navigation class="h-full flex flex-col"></app-navigation>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class App {}
