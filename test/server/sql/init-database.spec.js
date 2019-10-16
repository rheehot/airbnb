// db.Publisher.sync();
describe("Sequelize - init-database", () => {
    const {
        createTable,
        clearTable,
        createDummyData,
        initDatabaseSync
    } = require("../../../sql/init-database");
    const {
        user,
        house,
        reservation,
        sequelize
    } = require("../../../models/db");

    afterAll(async done => {
        sequelize.close();
        done();
    });

    test("Init all", async () => {
        // given

        // when
        const allResult = await initDatabaseSync();

        // then
        expect(allResult.length).toBeTruthy();
    });

    describe("User", () => {
        test("(IF NOT EXITS)User 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(user);

            // then
            expect(syncResult.name).toEqual("user");
        });

        test("User 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(user);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("User 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(user);

            // then
            expect(recordLength).toEqual(createResult.length);
        });
    });

    describe("House", () => {
        test("(IF NOT EXITS)House 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(house);

            // then
            expect(syncResult.name).toEqual("house");
        });

        test("House 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(house);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("House 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(house);

            // then
            expect(recordLength).toEqual(createResult.length);
        });
    });

    describe("Reservation", () => {
        test("(IF NOT EXITS)Reservation 테이블 생성", async () => {
            // given

            // when
            const syncResult = await createTable(reservation);

            // then
            expect(syncResult.name).toEqual("reservation");
        });

        test("Reservation 데이터 초기화", async () => {
            // given

            // when
            const clearResult = await clearTable(reservation);

            // then
            expect(typeof clearResult).toEqual("number");
        });

        test("Reservation 초기 데이터 추가", async () => {
            // given

            // when
            const { recordLength, createResult } = await createDummyData(
                reservation
            );

            // then
            expect(recordLength).toEqual(createResult.length);
        });
    });
});
