import { SecurityService } from './security.service';
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private securityService: SecurityService) { }

  @Input() set hasClaim(claimType: any) {
    if (this.securityService.hasClaim(claimType)) {
      // add template to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      // remove template from DOM
      this.viewContainer.clear();
    }
  }
}
