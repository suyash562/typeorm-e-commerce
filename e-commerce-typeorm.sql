select * from user_2k9;


select * from product_2k9;

select * from orders_2k9;
-- delete from user_2k9 where id = 8;

select * from order_item_2k9;

select * from order_item_2k9 where orderPrice > (select avg(orderPrice) from order_item_2k9);