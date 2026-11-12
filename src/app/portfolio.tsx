import { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useCVData } from '../context/CVContext';
import ScreenContainer from '../components/navigation/ScreenContainer';
import SearchBar from '../components/common/SearchBar';
import EmptyState from '../components/common/EmptyState';
import SectionCard from '../components/SectionCard';

const CATEGORIES = ['Semua', 'Branding', 'UI/UX Design', 'Social Media', 'Videografi'];

export default function PortfolioScreen() {
  const theme = useTheme();
  const { cvData, favoriteProjects, toggleFavoriteProject } = useCVData();
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [search, setSearch] = useState('');
  const [filterFavoritesOnly, setFilterFavoritesOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    const portfolio = cvData?.portfolio || [];
    let result = [...portfolio];

    if (selectedCategory !== 'Semua') {
      result = result.filter(
        (p) => p.kategori.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.judul.toLowerCase().includes(q) ||
          p.deskripsi.toLowerCase().includes(q) ||
          p.tools.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filterFavoritesOnly) {
      result = result.filter((p) => favoriteProjects.includes(p.id));
    }

    return result;
  }, [cvData?.portfolio, selectedCategory, search, filterFavoritesOnly, favoriteProjects]);

  if (!cvData) return null;
  const totalProjects = cvData.portfolio.length;

  const handleOpenLink = (url?: string) => {
    if (url) {
      Linking.openURL(url).catch(() => {});
    }
  };

  return (
    <ScreenContainer
      title="Portfolio"
      subtitle="Koleksi Karya Desain, Branding, UI/UX, & Videografi"
    >
      {/* ── Search Bar ── */}
      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Cari judul proyek, software, atau deskripsi..."
        onClear={() => setSearch('')}
      />

      {/* ── Category Filters & Favorite Filter ── */}
      <View style={styles.filterSection}>
        <View style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryPill,
                  {
                    backgroundColor: active ? theme.text : theme.surface,
                    borderColor: active ? theme.text : theme.cardBorder,
                  },
                ]}
                onPress={() => setSelectedCategory(cat)}
                accessibilityRole="button"
                accessibilityLabel={`Filter kategori ${cat}`}
              >
                <Text
                  style={[
                    styles.categoryText,
                    { color: active ? theme.primaryBtnText : theme.text },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Favorite Filter Toggle */}
        <TouchableOpacity
          style={[
            styles.favToggleBtn,
            {
              backgroundColor: filterFavoritesOnly ? theme.text : theme.surface,
              borderColor: filterFavoritesOnly ? theme.text : theme.cardBorder,
            },
          ]}
          onPress={() => setFilterFavoritesOnly((prev) => !prev)}
          accessibilityRole="button"
          accessibilityLabel="Tampilkan proyek favorit saja"
        >
          <Text
            style={[
              styles.favToggleText,
              { color: filterFavoritesOnly ? theme.primaryBtnText : theme.text },
            ]}
          >
            ★ Favorit ({favoriteProjects.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── Counter ── */}
      <View style={styles.counterRow}>
        <Text style={[styles.counterText, { color: theme.textMuted }]}>
          Menampilkan <Text style={{ color: theme.text, fontWeight: '700' }}>{filteredProjects.length}</Text> dari {totalProjects} total proyek
        </Text>
      </View>

      {/* ── Empty State or Project List ── */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="Tidak Ada Proyek yang Cocok"
          description={
            filterFavoritesOnly
              ? 'Anda belum menandai proyek sebagai favorit.'
              : `Tidak ditemukan proyek untuk kategori "${selectedCategory}" dengan kata kunci "${search}".`
          }
          actionText="Reset Semua Filter"
          onAction={() => {
            setSelectedCategory('Semua');
            setSearch('');
            setFilterFavoritesOnly(false);
          }}
        />
      ) : (
        <View style={styles.projectsGrid}>
          {filteredProjects.map((item) => {
            const isFav = favoriteProjects.includes(item.id);

            return (
              <SectionCard
                key={item.id}
                title={`${item.kategori} • ${item.tahun}`}
                accentColor={item.warna}
                collapsible={false}
              >
                <View style={styles.cardHeaderRow}>
                  <Text style={[styles.projectTitle, { color: theme.text }]}>
                    {item.judul}
                  </Text>
                  <TouchableOpacity
                    style={[
                      styles.starBtn,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.cardBorder,
                      },
                    ]}
                    onPress={() => toggleFavoriteProject(item.id)}
                    accessibilityRole="button"
                    accessibilityLabel={isFav ? 'Hapus dari favorit' : 'Tambah ke favorit'}
                  >
                    <Text
                      style={[
                        styles.starText,
                        { color: isFav ? '#f59e0b' : theme.textMuted },
                      ]}
                    >
                      {isFav ? '★ Favorit' : '☆ Simpan'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.projectDesc, { color: theme.textMuted }]}>
                  {item.deskripsi}
                </Text>

                {/* Tools Chips */}
                <View style={styles.toolsRow}>
                  {item.tools.map((t) => (
                    <View
                      key={t}
                      style={[
                        styles.toolChip,
                        {
                          backgroundColor: theme.surface,
                          borderColor: theme.cardBorder,
                        },
                      ]}
                    >
                      <Text style={[styles.toolText, { color: theme.text }]}>
                        {t}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Action Link */}
                {item.link && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={[
                        styles.linkBtn,
                        {
                          backgroundColor: theme.primaryBtn,
                        },
                      ]}
                      onPress={() => handleOpenLink(item.link)}
                      accessibilityRole="link"
                      accessibilityLabel={`Buka proyek ${item.judul}`}
                    >
                      <Text
                        style={[
                          styles.linkBtnText,
                          { color: theme.primaryBtnText },
                        ]}
                      >
                        Buka Studi Kasus / Desain ↗
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </SectionCard>
            );
          })}
        </View>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  filterSection: {
    marginBottom: 16,
    gap: 12,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryPill: {
    paddingVertical: 7,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  favToggleBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  favToggleText: {
    fontSize: 12,
    fontWeight: '700',
  },
  counterRow: {
    marginBottom: 16,
  },
  counterText: {
    fontSize: 13,
  },
  projectsGrid: {
    gap: 8,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 8,
  },
  projectTitle: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
    minWidth: 200,
  },
  starBtn: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  starText: {
    fontSize: 12,
    fontWeight: '700',
  },
  projectDesc: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 14,
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  toolChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
  },
  toolText: {
    fontSize: 11,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linkBtn: {
    paddingVertical: 9,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  linkBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
