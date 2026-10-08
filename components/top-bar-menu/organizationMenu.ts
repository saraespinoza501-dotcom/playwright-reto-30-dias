import { Locator, Page } from "@playwright/test";

export class OrganizationMenu{

    readonly page:Page
    readonly organization: Locator
    readonly generalInformationOption
    readonly locationOption


    constructor(page: Page){
    this.page = page
    this.organization = page.getByRole('navigation', {name: 'Topbar Menu'}). getByText('Organization')
    this.generalInformationOption = page.getByRole('menuitem', {name: 'General Information'})
    this.locationOption= page.getByRole('menuitem', {name: 'Locations'})
        
    }
     async clicKOnOrganization(){
        await this.organization.click()
       
    }

    async clicKOnGeneralInformationOption(){ 
        await this.clicKOnOrganization ()   
        await this.generalInformationOption.click()

    }
    async clicKOnLocation(){
     await this.clicKOnOrganization()  
        await this.locationOption.click()

   
    }
    


}