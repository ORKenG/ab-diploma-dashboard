# ab-diploma-dashboard

Users
    Site -> reference - username, generate siteID. Site ID to be used in url in client-side library.
    ${DomainName}/api/site/${siteID}
        Containers -> comes from client-side, reference - siteID. If container with such ID not existed - to create. Contains containerEventsField with all necessary info
