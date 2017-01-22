---
author: alex
categories:
- basededatos
color: '#009688'
date: '2016-12-12'
layout: post.amp
mainclass: BaseDeDatos
permalink: /resultados-examen-plsql-base-de-datos/
tags:
- examenes resueltos bases de datos
- examenes resueltos bases de datos pl/sql
- examenes sql
title: Resultados examen PL/SQL base de datos
---

<div class="icosql">
</div>

Voy a dejar el examen que hice hace poco de base de datos, junto con el enunciado.

El examen tiene un 9, por lo que hay algunas pequeñas cosas que no estan hechas bien del todo.

<a class="aligncenter download-button" href="https://elbauldelprogramador.com/erp-cobros/" rel="nofollow"> Download &ldquo;ERP COBROS&rdquo; <small>ERP_COBROS.pdf &ndash; Downloaded 1411 times &ndash; </small> </a>



```sql
--ejercicio 1
create or replace procedure p_genRecibos(fac facturas.nfactura%type, cli facturas.cCodCliente%type, fechaE facturas.fecha%type, fPago facturas.cCodFPago%type, importe number)
is
  numRecibos fpagos.nRecibos%type;
  daBancarios clientes_cuentas%rowtype;
  fechaPago date;
  imp number;
  id_cuenta clientes.idcuenta%type;
begin
     select nRecibos into numRecibos from fpagos where cCodFpago = fPago;
     select idcuenta into id_cuenta from clientes where cCodCliente = cli;
     select * into daBancarios from clientes_cuentas where cCodCliente || idcuenta = cli || id_cuenta;
     imp := importe/numRecibos;
     loop
          exit when numRecibos = 0;
          fechaPago := last_day(add_months(fechaE,numRecibos));
          insert into recibos values (fac, numRecibos, fechaE, fechaPago, imp, 'N', cli, daBancarios.cCodBanco, daBancarios.sucursal, daBancarios.CodControl, daBancarios.numCuenta);
          numRecibos := numRecibos - 1;
     end loop;
end;


----------------------------
--ejercicio 1
create or replace trigger ins_Factura
before insert
on facturas
for each row
    declare
       imptMayCero exception;
       noPagada    exception;
       descFPago   fPagos.descripcion%type;
    begin
         if :new.importe < 0 then raise imptMayCero; end if;
         if upper(:new.abono) = 'N' then
            --Compruebo la forma de pago
            select descripcion into descfPAgo from fPAgos where cCodFpago = :new.cCodFPago;
            if descfPago = 'PAGO AL CONTADO' or :new.cCodCliente = 'C001' then
               if upper(:new.pagada) = 'N' then raise noPagada; end if;
               insert into recibos values (:new.nfactura, 1, :new.fecha, :new.fecha, :new.importe, 'S', :new.cCodCliente, ' ',' ',' ', ' ');
            else
                p_genRecibos(:new.nfactura, :new.cCodCliente, :new.fecha, :new.cCodFPago, :new.importe);
            end if;
         end if;
    exception
             when imptMayCero then raise_application_error(-20001,'El importe ha de ser siempre mayor a cero');
             when noPagada then raise_application_error(-20002,'La factura para PAGO AL CONTADO ha de estar pagada');
    end;




    -------------------------------------
--ejercicio 2
create or replace trigger up_recibos
before update
on recibos
for each row
declare
       FacPagada facturas.pagada%type;
       descFPago fPagos.descripcion%type;
       fPago     fPagos.cCodFPago%type;
       cursor c_dBancarios is select ccodBanco, sucursal, codControl, numCuenta from clientes_cuentas where cCodCliente = :old.cCodCliente;
       xBancarios c_dBancarios%Rowtype;
       errorDBancarios boolean;
       datosBancarios  varchar2(50);
       isPagada        exception;
       excepcionBancos exception;
       errorFechas     exception;
       imporMuyAlto    exception;
       modPK           exception;
begin
     select pagada into FacPagada from facturas where nFactura = :old.nFactura;
     select cCodFPago into fPago from facturas where nFactura = :old.nFactura;
     select descripcion into descfPAgo from fPAgos where cCodFpago = fpago;
     --Compurebo que esta pagadas
     if upper(:old.pagado) = 'S' or descfPago = 'PAGO AL CONTADO' or FacPagada = 'S' then raise isPagada; end if;
     --Compriobacion de datos bancarios
     if :old.cCodBanco != :new.cCodBanco or :old.sucursal != :new.sucursal or :old.codControl != :new.codControl or :old.NumCuenta != :new.NumCuenta then
        datosBancarios := :new.cCodBanco || :new.sucursal || :new.CodControl || :new.numCuenta;
        open c_dBancarios;
             loop
                 fetch c_dBancarios into xBancarios;
                 exit when c_dBancarios%notfound;
                 if datosBancarios = xBancarios.cCodBanco || xBancarios.sucursal || xBancarios.CodControl || xBancarios.numCuenta then
                    errorDBancarios := false;
                    exit;
                 else
                     raise excepcionBancos;
                 end if;
             end loop;
        close c_dBancarios;

     end if;

     --Comprobacion fecha emision
     if :new.fechaPago < :new.fechaEmis then raise errorFechas; end if;

     -- si se cambia ele importe ha de ser 10% mayot
     if (:new.importe != :old.importe) and (:new.importe > :old.importe*1.1) then raise imporMuyAlto; end if;
     -- Nmo se pueden modificar las claves primarias
     if (:new.nfactura != :old.nFactura ) or (:new.nRecibo != :old.nreCibo) then raise modPK; end if;
    exception
            when isPagada        then raise_application_error(-20003,'El recibo no se puede modificar, esta pagado');
            when excepcionBancos then raise_application_error(-20004, 'Los datos bancarios no existen para ese cliente');
            when errorFechas     then raise_application_error(-20005, 'La fecha de emision es mayor que la de pago');
            when imporMuyAlto    then raise_application_error(-20006, 'El impoerte nuevo es mayor que el 10% del anterior');
            when modPK           then raise_application_error(-20007, 'No se pude modificar numFac o numRec');
end;





--------------------------------

--ejercicio 3
create or replace procedure sp_Lis_FacxCli (xCodCli clientes.cCodCliente%type, xSumRecNoPag out number, xSumRecPag out number)
is
  cursor c_cliente(xCodCli clientes.cCodCliente%type)
  is
     select nombre, direccion, codPostal, poblacion, provincia, pais from clientes where cCodCliente = xCodCli;
  xDatosCli c_cliente%rowtype;

  cursor c_CliFact(xCodCli clientes.cCodCliente%type)
  is
    select * from facturas where cCodCliente = xCodCli;
  xDatosFact c_CliFact%rowtype;
  descFPago fpagos.descripcion%type;
  numRecibos number;
  tipo varchar2(15);
begin
     open c_cliente(xCodCli);
          fetch c_cliente into xDatosCli;
          dbms_output.put_line(lpad('Cliente: ', 60, ' ') || '   ' || xDatosCli.nombre);
          dbms_output.put_line(lpad(xDatosCli.direccion, 66, ' '));
          dbms_output.put_line(lpad(xDatosCli.CodPostal, 67, ' ') || '   ' || xDatosCli.poblacion);
          dbms_output.put_line(lpad(xDatosCli.provincia, 67, ' ') || '   ' || xDatosCli.pais);
          dbms_output.put_line('Tipo     Numero     Fecha     F.Pago                      Importe     Pagada    NRecibos    Re.Paga    Rec.No Pagados');
          open c_CliFact(xCodCli);
          loop
              fetch c_CliFact into xDatosFact;
              exit when c_CliFact%notfound;
              if xDatosFact.abono = 'N' then tipo := 'Factura';
              else tipo := 'Abono'; end if;
              --Cuento los recibos de la factura
              select count(*) into numRecibos from recibos where cCodCliente = xCodCli;
              select sum(decode(pagado, 'S', importe)) into xSumRecPag from recibos where cCodCliente = xCodCli;
              select sum(decode(pagado, 'N', importe)) into xSumRecNoPag from recibos where cCodCliente = xCodCli;
              select descripcion into descfPAgo from fPAgos where cCodFpago = xDatosFact.cCodFPago;
              dbms_output.put_line(rpad(tipo, 10 ,' ') || rpad(xDatosFact.nFactura, 10, ' ')
              || rpad(xDatosFact.fecha, 10, ' ') || rpad(xDatosFact.cCodFPago, 10, ' ')
              || rpad(descfPAgo, 20, ' ')|| rpad(xDatosFact.importe, 13, ' ') || rpad(xDatosFact.pagada, 11, ' ')
              || rpad(numRecibos, 20, ' ')|| rpad(xSumRecPag, 20, ' ')|| rpad(xSumRecNoPag, 20, ' '));
          end loop;
          close c_CliFact;
     close c_cliente;
end;

set serveroutput on;
declare
xSumRecNoPag number;
xSumRecPag number;
begin
sp_Lis_FacxCli('C002', xSumRecNoPag,xSumRecPag);
end;



```

[Enlace al resultado.][1]

Espero que os sea útil.



 [1]: http://pastebin.com/CUDjz0kc