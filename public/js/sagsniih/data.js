export default class Data {
    constructor(dataUrl) {
        this.productUrl = dataUrl;
        this.products = [];
    }
    async refreshData() {
        try {
            const result = await fetch(this.productUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$7w3VcmT.B7rqVSCm/vok8u/CpprJpveDoIogwVSLZK9AZoFdxbCLG",
                },
            });
            if (!result.ok) {
                return new Map(); 
            }

            const productsData = await result.json();
            console.log("Fetched data:", productsData); 

            const product = productsData?.record?.container;
            console.log(productsData?.record?.container.article)
            if (!product || !product.id) {
                return new Map(); 
            }

            this.products = [product];
            return new Map([[product.id, product]]);
        } catch (error) {
            return new Map(); 
        }
    }
}