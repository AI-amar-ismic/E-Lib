package com.codecta;

import com.codecta.Services.ELibService;
import com.codecta.Services.models.BookDto;

import javax.inject.Inject;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.inject.Inject;
import javax.print.attribute.standard.Media;
import javax.ws.rs.Consumes;
import javax.ws.rs.*;
import javax.ws.rs.core.*;
import java.util.List;

@Path("/book")
public class ELibResource {

    @Inject
    ELibService service;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addBook(BookDto book, @Context UriInfo uriInfo){
        BookDto bookDto = service.addNewBook(book);
        if (bookDto!=null){
            UriBuilder uriBuilder = uriInfo.getAbsolutePathBuilder();
            uriBuilder.path(Integer.toString(bookDto.getId()));
            return Response.created(uriBuilder.build()).entity(bookDto).build();
        }
        return Response.status(Response.Status.BAD_REQUEST).build();
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response updateBook (BookDto book, @PathParam("id") Integer id){
        BookDto bookDto = service.updateBook(book, id);
        if (bookDto == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(bookDto).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response deleteBook(@PathParam("id") Integer id){
        BookDto bookDto = service.deleteBook(id);
        if (bookDto == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(bookDto).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response getById (@PathParam("id") Integer id){
        BookDto bookDto = service.getBookById(id);
        if (bookDto == null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(bookDto).build();
    }

    @GET
    @Produces
    public Response getAllBooks(){
        List<BookDto> books = service.getAllBooks();
        if (books==null){
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(books).build();
    }

}
