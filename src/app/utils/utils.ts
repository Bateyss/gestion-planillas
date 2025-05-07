import { MatDialogConfig } from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

export class Utils {

    static snackBarConfig(): MatSnackBarConfig {
        let snackConfig: MatSnackBarConfig = new MatSnackBarConfig();
        snackConfig.duration = 12000;
        snackConfig.panelClass = ['btn', 'btn-outline-dark'];
        snackConfig.verticalPosition = 'top';
        snackConfig.horizontalPosition = 'center';
        return snackConfig;
    }

    static openSnackBar(message: string, action: string, snackBar: MatSnackBar) {
        let snackConfig = Utils.snackBarConfig();
        snackBar.open(message, action, snackConfig);
    }

    static getMatDialogConf(): MatDialogConfig {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        return dialogConfig;
    }
}