// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EmbalseSearchModel } from "../../embalse-search.vm";
import { addNewSearchEntry, getStoredSearches } from "./recentSearches.bussiness";

describe("recentSearches business logic", () => {
  it("Debe añadir una entrada a una lista vacía", () => {
    // --- STEP 1: ARRANGE ---
    const embalseList: EmbalseSearchModel[] = [];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };

    // --- STEP 2: ACT ---
    const result = addNewSearchEntry(newSearch, embalseList);

    // --- STEP 3: ASSERT ---
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("cenajo");
  });

  it("Si hay un elemento repetido debe moverlo al principio sin duplicarlo", () => {
    // --- STEP 1: ARRANGE ---
    const embalseList: EmbalseSearchModel[] = [
      { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
      { slug: "chanza", name: "Chanza (Huelva)" },
      { slug: "cenajo", name: "Cenajo (Albacete)" },
    ];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };
    // --- STEP 2: ACT ---
    const result = addNewSearchEntry(newSearch, embalseList);
    // --- STEP 3: ASSERT ---
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual(newSearch);
    expect(result[2].slug).toBe("chanza");
  });

  it("Si el array tiene 5 elementos, debe añadir el nuevo al principio y eliminar el más antiguo", () => {
    // ARRANGE
    const embalseList: EmbalseSearchModel[] = [
      { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
      { slug: "chanza", name: "Chanza (Huelva)" },
      { slug: "loteta-la", name: "Loteta (La) (Zaragoza)" },
      { slug: "mequinenza", name: "Mequinenza (Zaragoza)" },
      { slug: "certescans", name: "Certescáns (Lleida)" },
    ];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };

    // ACT
    const result = addNewSearchEntry(newSearch, embalseList);

    // ASSERT
    expect(result).toHaveLength(5);
    expect(result[0].slug).toBe(newSearch.slug);
    expect(result.some((e) => e.slug === newSearch.slug));
    expect(result[4].slug).toBe("mequinenza");
  });

  it("Debe añadir una entrada a una lista que ya tiene elementos pero no está llena", () => {
    // ARRANGE
    const embalseList: EmbalseSearchModel[] = [
      { slug: "gonzalez-lacasa", name: "González Lacasa (La Rioja)" },
    ];
    const newSearch: EmbalseSearchModel = {
      slug: "cenajo",
      name: "Cenajo (Albacete)",
    };
    // ACT
    const result = addNewSearchEntry(newSearch, embalseList);
    // ASSERT
    expect(result).toHaveLength(2);
    expect(result[0].slug).toBe("cenajo");
    expect(result[1].slug).toBe("gonzalez-lacasa");
  });
});

describe("Test getStoredSearches", () => {
    
  it("debería retornar un array vacío si el localStorage está vacío", () => {
    // ARRANGE
    const spy = vi.spyOn(window.Storage.prototype, 'getItem');
      spy.mockReturnValue(null)
    // ACT
    const result = getStoredSearches();
    // ASSERT
    expect(result).toEqual([]);


  });

    it("", () => {
    // ARRANGE

    // ACT
  
    // ASSERT

  });

    it("", () => {
    // ARRANGE

    // ACT
  
    // ASSERT

  });

})