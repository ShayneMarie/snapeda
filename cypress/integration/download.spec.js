const URL = 'https://www.snapeda.com/parts/T4041017041-000/TE%20Connectivity%20AMP%20Connectors/view-part/?ref=search&t=T4041017041-000';
const BUTTON_DOWLOAD_SYMBOL_AND_FOOTPRINT_LOCATOR = 'a[name="download-modal"]';
const URL_LOGIN = 'https://www.snapeda.com/account/login/';
const ARRAY_FORMATS = [ 'altium_native', 'circuit_studio', 'cr_8000', 'designspark', 'diptrace', 'eagle', 'easypc', 'ecadstar', 'express_pcb_plus', 'fusion_360', 'kicad_options', 'orcad', 'pads', 'p_cad', 'pcb123', 'proteus', 'pulsonix', 'target3001%21'];
const ARRAY_FORMAT_3D_MODEL = [ '3D XML', '3MF', 'AMF', 'Acis 6.3', 'Alibre Design', 'AutoCAD (DWG) - 3D', 'AutoCAD MEP', 'BricsCAD (DWG) - 3D', 'CATIA V4'];

const ARRAY_FORMATS_LENGTH = ARRAY_FORMATS.length;
const ARRAY_FORMAT_3D_MODEL_LENGTH = ARRAY_FORMAT_3D_MODEL.length;

describe('Download', () => {
    beforeEach('Successful login', () => {
        cy.visit(URL_LOGIN)
        cy.get('input[name="username"]').type('shayne');
        cy.get('input[name="password"]').type('password');
        cy.get('input[type="submit"]').click();
    });

    let count = 0;
    while (count < ARRAY_FORMATS_LENGTH) {
        const FORMAT_LOCATOR = ARRAY_FORMATS[count];
        it(`Successful download Symbol and Footprints ${ARRAY_FORMATS[count]}`, () => {
            cy.visit(URL);
            cy.get(BUTTON_DOWLOAD_SYMBOL_AND_FOOTPRINT_LOCATOR).first().click();

            cy.get(`a[data-format="${FORMAT_LOCATOR}"]`).click();
            cy.findAllByText('Learn How To Import').should('exist');
        })
        count++;
    };

    count = 0;
    while (count < ARRAY_FORMAT_3D_MODEL_LENGTH) {
        const FORMAT_3D_MODEL_LOCATOR = ARRAY_FORMAT_3D_MODEL[count];
        it(`Successful download 3D Model ${ARRAY_FORMAT_3D_MODEL[count]}`, () => {
            const LINK_3D_MODEL_LOCATOR = 'li[rel="3D-model-section"]';
            cy.visit(URL);
            cy.get(LINK_3D_MODEL_LOCATOR).click();
            cy.get(BUTTON_DOWLOAD_SYMBOL_AND_FOOTPRINT_LOCATOR).last().click();

            cy.get(`select option[data-format="${FORMAT_3D_MODEL_LOCATOR}"]`).click({ force: true });
            cy.get('a[id="samtec-checkbox-3d-modal-download-individual-btn"]').click();
            cy.findAllByText('Learn How To Import').should('exist');
        });
        count++;
    };
});