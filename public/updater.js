const { autoUpdater } = require("electron-updater")
const { dialog } = require("electron")

// Configure log debugging
autoUpdater.logger = require("electron-log")
autoUpdater.logger.transports.file.level = "info"

//Disable auto downloading of updates
autoUpdater.autoDownload = false 


//Simple export to check for and apply any available updates
module.exports = () => {
    //Check for update (GH Releases) 
    autoUpdater.checkForUpdates()

    //List for update found
    autoUpdater.on('update-available', ()=>{
        //Prompt user to start download 
        dialog.showMessageBox({
            type: 'info',
            title: 'Atualização disponível',
            message: 'Uma nova versão do BCSapp esta disponível. Deseja atualizar agora?',
            buttons: ['Atualizar', 'Não']
        }).then(result =>{
            let buttonIndex = result.response
            if(buttonIndex === 0) autoUpdater.doDownloadUpdate()         
        })

    })

    //listen for update downloaded 
    autoUpdater.on('update-downloaded', ()=>{
        //Prompt the user to install the update
        dialog.showMessageBox({
            type: 'info',
            title: 'Atualização pronta',
            message: 'Instalar e atualizar agora?',
            buttons: ['Sim', 'Depois']
        }).then(result =>{
            let buttonIndex = result.response
            if(buttonIndex === 0) autoUpdater.quitAndInstall(false, true)         
        })
    })

}