import moment from "moment-timezone";

export default ({ app }, inject) => {
    inject('brazilianDate', (date) => {
        try {
            if (!(date instanceof Date)) {
                date = new Date(date);
            }

            const datept = moment(date).locale("pt-br");
            const formattedDate = datept.format("DD [de] MMMM [de] YYYY");

            return formattedDate;
        }
        catch (error) {
            return "Data invalida!"
        }
    });

};
