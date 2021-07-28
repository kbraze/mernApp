# HPL Task

This is my submission for my flat management software.

# How to run

You will need a mongo instance running for this. The easiest way to do this is to run it in a Docker container:
docker run -d -p 27017-27019:27017-27019 --name mongodb mongo

To run the front-end run the following commands from the client folder:

npm i
npm start

    This will run it on http://localhost:3000/

To run the back-end run the following commands from the server folder:

npm i
node server.js

    This will run it on http://localhost:5000/

You may want to add some flat details to get started on: http://localhost:3000/create

# Technologies used:

The MERN stack is used here:
MongoDB for the database
Express as the NodeJS web framework
ReactJS for the front-end
NodeJS for the back-end

Additionally graphql is used for API queries.

# Limitations:

The following are limitations that I would rectify with further development time.

    Unit testing:
        I would refactor the back-end and include unit testing with Jest.
        I would also include snapshot testing on the front-end.

    Refactoring:
        I would use the repository design pattern on the back-end. To do this I would separate database access code into a separate file.
        The graphql resolvers could also be refactored into separate components.

    Performance:
        There are no indexes to support the database access. Indexes to support future functionality could be added. For example, if functionality to search by address is added, an index could be applied by the code for address on start-up.

    Data views:
        A strength of graphql is that api calls can be selective in what fields are retrieved from a call. If the 'flat' object were to get larger with more properties, I'd use different graphql calls to support different views on the data.

    Scalability:
        To make the application scalable I would host the database on Atlas, MongoDB's could service, and containerize the back-end and run it on a cloud service such as AWS. Kubernetes would be used to orchestrate the containers. To manage security and access to the back-end services a service such as Apigee could be used.

    Security:
        The database connection string is in a config file that is part of source control. Credentials like this should never be checked into source control and instead should be retrieved from a secrets store.

    Application logging / monitoring:
        As the application becomes more complex, logging will be necessary when key events occur. For example, I would log when a Create, Read, Update or Delete operation succeeds or fails. Eventually, elastic search and a front-end such as Kibana could be used to visualise the logging.

# Future improvements:

In addition to rectifying the limitations above, here are some future improvements to the application:

    Add edit and delete functionality. These functions would use mutations much in the same way that the setFlat mutation works.

    Add search functionality. This would enable users to search by landlord, tenant or address or a combination of properties. The performance of these searches would be supported by mongo indexing. The MongoDB filter builder would be used to create filters to manage the more complex searches.

# Long-term architectural considerations:

If, for example, functionality were to be added to see if a landlord has a mortgage with us, we could retrieve that data from another service. Microservices architecture could be used. Mortgage information would be held in a separate database, with a mortgage microservice providing an endpoint that could be called with a unique ID for a given landlord. This flat management application could then call the mortgage microservice to get the necessary data.
