import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { OrganizationService } from './organization/services/organization.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  active_view: string = '/graph-view';
  subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private organizationService: OrganizationService,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.organizationService
        .getErrorMessage()
        .subscribe((error) => this.showNotification(error))
    );
    this.subscriptions.push(
      this.organizationService
        .getSuccessMessage()
        .subscribe((success) => this.showNotification(success))
    );
    this.loadView('graph-view');
  }

  /**
   * Show toast message upon success or error after CRUD operations
   * @param message
   */
  showNotification(message: string | null) {
    if (message) {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
      });
    }
  }

  /**
   * Loads the specific view eg: Graph / Grid
   * @param view
   */
  loadView(view: string) {
    this.active_view = view;
    const route: string = `/organization/${view}`;
    this.router.navigate([route]);
  }

  /**
   * Unsubscribe from observables and other cleanup operations
   */
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
